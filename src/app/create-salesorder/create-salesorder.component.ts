import { Component, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { FlowerFormula } from '../interface/flower-formula'
import { Florist } from '../interface/florist'
import { RestApiService } from '../_shared/rest-api.service';
import { FlowerAvailable } from '../interface/flower-available';
import { SalesOrderPrice } from '../interface/sales-order-price';
import { CreateSalesOrder } from '../interface/create-sales-order';

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
  createSalesOrder!: CreateSalesOrder;


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

    this.salesOrderForm.controls["flowerFormular"].valueChanges.subscribe((val: number = 1) => {
      if (this.salesOrderForm.controls["flowerFormular"].value != null) {
        let floristId = 1;
        let totalOrder = 0;
        if (this.salesOrderForm.controls["florist"].value != null) {
          floristId = this.salesOrderForm.controls["florist"].value;
        }
        this.flowerAvailables = [];
        this.restApiService.getFlowerAvailable(val, floristId).subscribe((data: FlowerAvailable[]) => {
          for (let i = 0; i < data.length; i++) {
            this.flowerAvailables.push(data[i]);
          }
        });

        this.restApiService.getSalesOrderPrice(val, floristId, totalOrder).subscribe((data: SalesOrderPrice) => {
          this.salesOrderForm.controls["flowerPrice"].setValue(data.flowerPrice);
          this.salesOrderForm.controls["deliveryFee"].setValue(data.feePrice);
          this.salesOrderForm.controls["totalPrice"].setValue(data.totalPrice);
        });
      }
    });

    this.salesOrderForm.controls["florist"].valueChanges.subscribe((val: number = 1) => {
      if (this.salesOrderForm.controls["florist"].value != null) {
        let formulaId = 1;
        let totalOrder = 0;
        if (this.salesOrderForm.controls["flowerFormular"].value != null) {
          formulaId = this.salesOrderForm.controls["flowerFormular"].value;
        }
        this.flowerAvailables = [];
        this.restApiService.getFlowerAvailable(formulaId, val).subscribe((data: FlowerAvailable[]) => {
          for (let i = 0; i < data.length; i++) {
            this.flowerAvailables.push(data[i]);
          }
        });

        this.restApiService.getSalesOrderPrice(formulaId, val, totalOrder).subscribe((data: SalesOrderPrice) => {
          this.salesOrderForm.controls["flowerPrice"].setValue(data.flowerPrice);
          this.salesOrderForm.controls["deliveryFee"].setValue(data.feePrice);
          this.salesOrderForm.controls["totalPrice"].setValue(data.totalPrice);
        });
      }
    });

    this.salesOrderForm.controls["flowerAvailable"].valueChanges.subscribe((val: number = 0) => {
      if (this.salesOrderForm.controls["flowerAvailable"].value != null) {
        let formulaId = 1;
        let floristId = 1;
        if (this.salesOrderForm.controls["flowerFormular"].value != null) {
          formulaId = this.salesOrderForm.controls["flowerFormular"].value;
        }
        if (this.salesOrderForm.controls["florist"].value != null) {
          floristId = this.salesOrderForm.controls["florist"].value;
        }
        this.restApiService.getSalesOrderPrice(formulaId, floristId, val).subscribe((data: SalesOrderPrice) => {
          this.salesOrderForm.controls["flowerPrice"].setValue(data.flowerPrice);
          this.salesOrderForm.controls["deliveryFee"].setValue(data.feePrice);
          this.salesOrderForm.controls["totalPrice"].setValue(data.totalPrice);
        });
      }
    });

  }

  onSubmit(): void {
    this.createSalesOrder = this.salesOrderForm.value;
    this.createSalesOrder.flowerPrice = this.salesOrderForm.controls["flowerPrice"].value;
    this.createSalesOrder.deliveryFee = this.salesOrderForm.controls["deliveryFee"].value;
    this.createSalesOrder.totalPrice = this.salesOrderForm.controls["totalPrice"].value;
    console.warn(this.createSalesOrder);
    this.restApiService.createSalesOrder(this.createSalesOrder);
    this.salesOrderForm.reset();
  }

}
