import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-dashboard-form-field-autocomplete',
  templateUrl: './dashboard-form-field-autocomplete.component.html',
  styleUrls: ['./dashboard-form-field-autocomplete.component.css']
})
export class DashboardFormFieldAutocompleteComponent implements OnInit {

  @Input() label: string;
  @Input() control: FormControl;
  @Input() options$: Observable<any>;

  enabled: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.options$.subscribe(options => {
      if(options.length > 0){
        this.control.enable();
      }else {
        this.control.disable();
      }
    });
  }

}
