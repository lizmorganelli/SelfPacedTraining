import { Component, OnInit } from '@angular/core';

import { Customer } from './model';
import { DataService } from './data.service';
import { LoggerService } from './logger.service';

@Component({
  moduleId: module.id,
  selector: 'customer-list',
  templateUrl: 'customer-list.component.html',
  styleUrls: ['customer-list.component.css']
})
export class CustomerListComponent implements OnInit {
  customers: Customer[]; //where did the data go?

  customer: Customer;
  isBusy = false;
  //move th efollowing into a model
  // name = 'Alex Smith';
  // street = '21 Willey Street';
  // city = 'Rollinsford';
  // region = 'East';

  // two new models -  Customer & Address
  // customer : Customer = new Customer(); OR
  // customer: Customer = {
  //   id : 1,
  //   name : 'Alex Smith',
  //   address : {
  //     street : '21 Willey Street',
  //     city : 'Rollinsford',
  //     state : 'NH',
  //     region : 'East',
  //   }
  // };

  //dependecy injection.  Keep track of services and allow them to be used via the constructor and inject it
  //private tells it to create a property of the compnent called dataservices that is used only here
  constructor(
    private dataService: DataService,
    private loggerService: LoggerService) { }

  //lifecycle goes here 
  ngOnInit() {
    this.getCustomers();
  }

  getCustomers() {
    this.isBusy = true;
    this.loggerService.log('Getting customers...');
    //the below code is synchronous
    // this.customers = this.dataService.getCustomers();
    //changed it to asynchronous
    //with Promise : 
    // this.dataService.getCustomersP().then(custs => {
    //with Observable
    this.dataService.getCustomers().subscribe(custs => {
      this.isBusy = false;
      this.customers = custs;
    }, (errorMsg: string) => {
      this.isBusy = false;
      alert(errorMsg);
    }

    );
  }

  getStates() {
    this.isBusy = true;
    this.loggerService.log('Getting states...');
    this.dataService.getStates().subscribe(states => {
      this.isBusy = false;
      this.customers = states;
    }, (errorMsg: string) => {
      this.isBusy = false;
      alert(errorMsg);
    }

    );
  }

  shift(increment: number) {
    // first get the index of the customer that is currently selected
    //lambda - customer wherever c equals this customer then we will have the index we need
    // add the increment
    //assigned to variable ix 
    let ix = this.customers.findIndex(c => c === this.customer) + increment;
    //this will break if they scroll left to zero and then hit - numbers... need to do some
    // math logic to keep in bounds between zero and ix - get the true index
    ix = Math.min(this.customers.length - 1, Math.max(0, ix));
    this.customer = this.customers[ix];
  }
}
