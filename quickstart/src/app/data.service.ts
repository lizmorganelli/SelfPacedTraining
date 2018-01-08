import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/toPromise';

import { createTestCustomers } from './test-data';
import { LoggerService } from './logger.service';
import { Customer } from './model';


@Injectable()
export class DataService {
    private customersUrl = 'api/customers';

    constructor(private loggerService: LoggerService,
        private http: Http, ) { }

    getCustomersP(): Promise<Customer[]> {
        this.loggerService.log(`Getting customers as a Promise via Http...`);

        //below is using http
        return this.http.get(this.customersUrl)
            .toPromise()
            .then(response => {
                const custs = response.json().data as Customer[];
                this.loggerService.log(`Got ${custs.length} customers`);
                return custs;
            }, 
        error => {
            this.loggerService.log(`Error Occurred: ${error}`);
            return Promise.reject("Something bad happened, please check the console");
        }
        );

        //below is if we are not using http
        // const customers = createTestCustomers();

        // return new Promise<Customer[]>(resolve => {
        //     setTimeout(() => {
        //         this.loggerService.log(`Got ${customers.length} customers`);
        //         resolve(customers);
        //     }, 1500);
        // });
    }

    getCustomers(): Observable<Customer[]> {
        this.loggerService.log(`Getting customers as an Observable...`);
        const customers = createTestCustomers();

        return of(customers);
        .delay(1500)
            .do(() => {
                this.loggerService.log(`Got ${customers.length} customers`);
            });
    }
}