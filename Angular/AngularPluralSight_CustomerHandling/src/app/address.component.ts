import { Component, Input, OnInit } from '@angular/core';

import { Address } from './model';
import { DataService } from './data.service';

@Component({
    moduleId: module.id,
    selector: 'my-address',
    templateUrl: 'address.component.html'
})
export class AddressComponent implements OnInit{
    @Input() address: Address;

    //Array for *ngFor to interate through in .html
    regions = ['East', 'South', 'North', 'West', 'Midwest'];
    // states = ['California', 'Illinois', 'Jalisco', 'Quebec'];
    states : string[];

    constructor(private dataService: DataService){ }   
    
    ngOnInit(){
        this.dataService.getStates().subscribe(states => {
            this.states = states;
        })
    }
}
