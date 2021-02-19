import { Component, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { FlowerFormula } from '../interface/flower-formula'
import { Florist } from '../interface/florist'
import { RestApiService } from '../_shared/rest-api.service';
import { FlowerAvailable } from '../interface/flower-available';

@Component({
  selector: 'create-salesorder',
  templateUrl: './create-salesorder.component.html',
  styleUrls: ['./create-salesorder.component.css']
})
export class CreateSalesorderComponent implements OnInit {

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
  
  constructor(
    private restApiService: RestApiService
  ) { }

  flowerFormulas: FlowerFormula[] = [];
  florists: Florist[] = [];
  flowerAvailables: FlowerAvailable[] = [];
  floristSelected: string | undefined;
  flowerSelected: string | undefined;
  flowerQuantitySelected: string | undefined;

  ngOnInit(): void {
    this.salesOrderForm.controls['flowerPrice'].disable();
    this.salesOrderForm.controls['deliveryFee'].disable();
    this.salesOrderForm.controls['totalPrice'].disable();

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

    // if(this.salesOrderForm.controls["flowerFormular"].value != null){
      this.salesOrderForm.controls["flowerFormular"].valueChanges.subscribe((val: number = 1) => {
        console.log(val);
        this.flowerAvailables = [];
        this.restApiService.getFlowerAvailable(val).subscribe((data: FlowerAvailable[]) => {
          for (let i = 0; i < data.length; i++) {
            this.flowerAvailables.push(data[i]);
          }
        });
      });
    // }
    
  }

  onSubmit(): void {
    console.warn(this.salesOrderForm.value);  
    this.salesOrderForm.reset();
  }
  
}
