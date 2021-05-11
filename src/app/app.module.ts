import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {HttpClientModule} from '@angular/common/http';
import {AirvisualModule} from './airvisual/airvisual.module';
import {MainModule} from './main/main.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,

    FlexLayoutModule,

    AppRoutingModule,
    AirvisualModule,
    MainModule,
  ],
  providers: [
    {provide: 'airvisual.api.host', useValue: 'http://api.airvisual.com/v2/'},
    //{provide: 'airvisual.api.key', useValue: '33a1f1ba-2ddf-45e7-99b6-0647dd59bd0c'},
    {provide: 'airvisual.api.key', useValue: 'd45b5ba5-6bce-4390-8250-385637fbac55'},
    {provide: 'main.storage.key', useValue: 'airvisual-demo.city'},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
