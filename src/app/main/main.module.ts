import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPageComponent } from './components/login/login-page/login-page.component';
import { DashboardPageComponent } from './components/dashboard/dashboard-page/dashboard-page.component';
import {MatInputModule} from '@angular/material/input';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {ReactiveFormsModule} from '@angular/forms';
import { DashboardFormFieldAutocompleteComponent } from './components/dashboard/dashboard-form-field-autocomplete/dashboard-form-field-autocomplete.component';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatCardModule} from '@angular/material/card';
import { DashboardResultCardComponent } from './components/dashboard/dashboard-result-card/dashboard-result-card.component';



@NgModule({
  declarations: [
    LoginPageComponent,
    DashboardPageComponent,
    DashboardFormFieldAutocompleteComponent,
    DashboardResultCardComponent
  ],
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatAutocompleteModule,
    ReactiveFormsModule,

    FlexLayoutModule
  ]
})
export class MainModule { }
