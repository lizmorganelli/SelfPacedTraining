import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent }  from './app.component';
import { CustomerListComponent } from './customer-list.component';
import { CustomerDetailComponent } from './customer-detail.component';
import { AddressComponent } from './address.component';
import { DataService } from './data.service';
import { LoggerService } from './logger.service';

//these two are just for development and would be going away
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';

@NgModule({
  imports:      [ BrowserModule, FormsModule, HttpModule,
    //importing a module and telling it how to set itself up 
    InMemoryWebApiModule.forRoot(InMemoryDataService) ],
  declarations: [ AppComponent, CustomerListComponent, CustomerDetailComponent, AddressComponent ],
  providers: [ DataService, LoggerService ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
