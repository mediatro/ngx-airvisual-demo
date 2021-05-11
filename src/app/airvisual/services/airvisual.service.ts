import {Inject, Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { query } from 'rx-query';

@Injectable({
  providedIn: 'root'
})
export class AirvisualService {

  constructor(
    private http: HttpClient,
    @Inject('airvisual.api.host') private apiHost: string,
    @Inject('airvisual.api.key') private apiKey: string,
  ) { }

  private get(url: string, params: {[param: string]: string | string[]} = {}){
    return this.http.get(this.apiHost.concat(url), {
      params: {...params,
        key: this.apiKey
      }
    });
  }

  private getCountries$(){
    return this.get('countries');
  }

  private getStates$(country: string){
    return this.get('states', {country: country});
  }

  private getCities$(country: string, state: string){
    return this.get('cities', {country: country, state: state});
  }

  private getCityData$(country: string, state: string, city: string){
    return this.get('city', {country: country, state: state, city: city});
  }

  getCountriesQuery$(){
    return query('countries', () => this.getCountries$());
  }

  getStatesQuery$(country: string){
    return query('states', [country], ([country]) => this.getStates$(country));
  }

  getCitiesQuery$(country: string, state: string){
    return query('cities', [country, state],  ([country, state]) => this.getCities$(country, state));
  }

  getCityDataQuery$(country: string, state: string, city: string){
    return query('city', [country, state, city],  ([country, state, city]) => this.getCityData$(country, state, city));
  }


}
