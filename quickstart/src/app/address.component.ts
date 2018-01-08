import { Component, Input } from '@angular/core';

import { Address } from './model';

@Component({
    moduleId: module.id,
    selector: 'my-address',
    templateUrl: 'address.component.html'
})
export class AddressComponent {
    @Input() address: Address;

    //Array for *ngFor to interate through in .html
    regions = ['East', 'South', 'North', 'West', 'Midwest'];
    states = ['California', 'Illinois', 'Jalisco', 'Quebec'];
}
