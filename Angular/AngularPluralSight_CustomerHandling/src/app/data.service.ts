import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { createTestCustomers } from './test-data';
import { LoggerService } from './logger.service';
import { Customer } from './model';
import { Address } from './model';
import { delay } from 'rxjs/operator/delay';


@Injectable()
export class DataService {
    //api is a convention that you are going back to a server with a base path and that is acommon pbase path
    private customersUrl = 'api/customers';
    private statesUrl = 'api/states';

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
                //resurface error
                return Promise.reject("Something bad happened in getting customers, please check the console");
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
        //with http
        return this.http.get(this.customersUrl)
            .map(response => response.json().data as Customer[])
            .do((custs) => {
                this.loggerService.log(`Got ${custs.length} customers`);
            })
            .catch((error: any) => {
                this.loggerService.log(`Error ocurred: ${error}`);
                return Observable.throw('Something bad happened in getting customers, please check the console');
            });
        //without http
        // const customers = createTestCustomers();

        // return of(customers);
        // .delay(1500)
        //     .do(() => {
        //         this.loggerService.log(`Got ${customers.length} customers`);
        //     });
    }

    getStates(): Observable<string[]> {
        this.loggerService.log(`Getting states as an Observable...`);
        //with http
        return this.http.get(this.statesUrl)
            .map(response => response.json().data as string[])
            .do((states) => {
                this.loggerService.log(`Got ${states.length} states`);
            })
            .catch((error: any) => {
                this.loggerService.log(`Error ocurred: ${error}`);
                return Observable.throw('Something bad happened in getting states, please check the console');
            });
    }
}