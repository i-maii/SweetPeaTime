import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Florist } from '../interface/florist';
import { FlowerFormula } from '../interface/flower-formula';
import { RestApiService } from '../_shared/rest-api.service';

@Component({
  selector: 'edit-salesorder',
  templateUrl: './edit-salesorder.component.html',
  styleUrls: ['./edit-salesorder.component.css']
})
export class EditSalesorderComponent implements OnInit {

  salesOrderForm = new FormGroup({
    orderFirstName: new FormControl(),
    orderLastName: new FormControl(),
    orderPhone: new FormControl(),
    orderDate: new FormControl(),
    receiverFirstName: new FormControl(),
    receiverLastName: new FormControl(),
    receiverPhone: new FormControl(),
    receiverAddress: new FormControl(),
    receiveDate: new FormControl(),
    flowerFormular: new FormControl(),
    flowerAvailable: new FormControl(),
    dateAvailable: new FormControl(),
    flowerPrice: new FormControl(),
    deliveryFee: new FormControl(),
    totalPrice: new FormControl(),
    florist: new FormControl(),
    note: new FormControl()
  });
  
  flowerFormulas: FlowerFormula[] = [];
  florists: Florist[] = [];

  constructor(
    private restApiService: RestApiService
  ) { }

  ngOnInit(): void {
    this.restApiService.getFlowerFormula().subscribe((data: FlowerFormula[]) => {
      for (let i = 0; i < data.length; i++) {
        this.flowerFormulas.push(data[i]);
      }
    });
    this.restApiService.getFlorist().subscribe((data: Florist[]) => {
      for (let i = 0; i < data.length; i++) {
        this.florists.push(data[i]);
      }
    });
  }

  numberOfOrder: number = 5;

  selectedValue: string | undefined;

  onSubmit(): void {
    console.warn(this.salesOrderForm.value);  
    this.salesOrderForm.reset();
  }

}
