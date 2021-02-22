import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { SalesOrderElement } from '../interface/sales-order-element';

@Injectable()
export class DataService {

    salesOrders!: SalesOrderElement;

    editOrder!: BehaviorSubject<SalesOrderElement>;
    
    constructor() {
        this.editOrder = new BehaviorSubject(this.salesOrders);
     }
  
    changeMessage(salesorder: SalesOrderElement) {
      this.editOrder.next(salesorder)
    }

}