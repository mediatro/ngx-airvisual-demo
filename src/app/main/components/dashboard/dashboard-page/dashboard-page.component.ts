import {Component, Inject, OnInit} from '@angular/core';
import {AirvisualService} from '../../../../airvisual/services/airvisual.service';
import {combineLatest, merge, Observable, of} from 'rxjs';
import {distinctUntilChanged, filter, map, mergeAll, mergeMap, switchMap} from 'rxjs/operators';
import {FormBuilder} from '@angular/forms';
import {QueryOutput} from 'rx-query';
import {StorageService} from '../../../services/storage.service';
import {AuthService} from '../../../services/auth.service';
import {Router} from '@angular/router';

function toData<T extends QueryOutput>(source: Observable<T>) {
  return source.pipe(
    filter(q => q.status == 'success'),
    map(q => q.data),
    map(data => (data as any).data),
  );
}

function filterData<T extends Array<any>>(source: Observable<T>) {
  return source.pipe(
    map(([value, data]) => (data as any[]).filter(item => (item as string).toUpperCase().includes(value.toUpperCase()))),
  );
}

function produceEvent<T extends Array<any>>(source: Observable<T>) {
  return source.pipe(
    filter(([value, data]) => !value || (data as any[]).filter(item => item === value).length > 0),
    map(([value, data]) => value),
    distinctUntilChanged(),
  );
}

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css']
})
export class DashboardPageComponent implements OnInit {

  countries$: Observable<any>;
  states$: Observable<any>;
  cities$: Observable<any>;

  cityData: any = null;
  loadingState = false;

  form = this.fb.group({
    country: this.fb.control(''),
    state: this.fb.control(''),
    city: this.fb.control(''),
  });

  constructor(
    @Inject('main.storage.key') private storageKey: string,
    private api: AirvisualService,
    private storage: StorageService,
    private auth: AuthService,
    private router: Router,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    let empty$ = of('');

    let allCountries$ = this.api.getCountriesQuery$().pipe(
      toData,
      map(data => data.map(item => item.country)),
    );
    let countryInput$ = merge(empty$, this.form.get('country').valueChanges.pipe(distinctUntilChanged()));
    let countryCombine$ = combineLatest([countryInput$, allCountries$]);
    this.countries$ = countryCombine$.pipe(
      filterData
    );
    let countrySelected$ = countryCombine$.pipe(
      produceEvent
    );

    let allStates$ = countrySelected$.pipe(
      mergeMap(value =>
        value ? this.api.getStatesQuery$(value).pipe(
          toData,
          map(data => data.map(item => item.state)),
        ) : of([])
      ),
    );
    let stateInput$ = merge(empty$, this.form.get('state').valueChanges.pipe(distinctUntilChanged()));
    let stateCombine$ = combineLatest([stateInput$, allStates$]);
    this.states$ = stateCombine$.pipe(
      filterData
    );
    let stateSelected$ = stateCombine$.pipe(
      produceEvent
    );

    let allCities$ = combineLatest([countrySelected$, stateSelected$]).pipe(
      mergeMap(([country, state]) =>
        country && state ? this.api.getCitiesQuery$(country, state).pipe(
          toData,
          map(data => data.map(item => item.city)),
        ) : of([])
      ),
    );
    let cityInput$ = merge(empty$, this.form.get('city').valueChanges.pipe(distinctUntilChanged()));
    let cityCombine$ = combineLatest([cityInput$, allCities$]);
    this.cities$ = cityCombine$.pipe(
      filterData
    );
    let citySelected$ = cityCombine$.pipe(
      produceEvent
    );

    countrySelected$.subscribe(value => {
      if (!this.loadingState) {
        this.form.get('state').setValue('')
      }
    });
    stateSelected$.subscribe(value => {
      if (!this.loadingState) {
        this.form.get('city').setValue('')
      }else{
        this.loadingState = false;
      }
    });

    combineLatest([countrySelected$, stateSelected$, citySelected$]).pipe(
      mergeMap(([country, state, city]) =>
        country && state && city ?  this.api.getCityDataQuery$(country, state, city).pipe(
          toData
        ) : of(null)
      )
    ).subscribe(value => {
      this.cityData = value;
    });

    // countrySelected$.subscribe(value => console.log(value));
    // stateSelected$.subscribe(value => console.log(value));
    // citySelected$.subscribe(value => console.log(value));
  }

  logout(){
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  canSave(): boolean {
    return this.form.get('country').value;
  }

  saveFormState(){
    this.storage.save(this.storageKey, this.form.value);
  }

  hasSavedFormState(): boolean {
    return this.storage.has(this.storageKey);
  }

  loadFormState(){
    this.loadingState = true;
    this.form.patchValue(this.storage.load(this.storageKey));
  }

  clearFormState(){
    this.storage.remove(this.storageKey);
  }

}
