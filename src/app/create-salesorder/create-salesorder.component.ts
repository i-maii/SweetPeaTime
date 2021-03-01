import { Component, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { FlowerFormula } from '../interface/flower-formula'
import { Florist } from '../interface/florist'
import { RestApiService } from '../_shared/rest-api.service';
import { FlowerAvailable } from '../interface/flower-available';
import { SalesOrderPrice } from '../interface/sales-order-price';
import { SalesOrderElement } from '../interface/sales-order-element';
import { SalesOrderMultiple } from '../interface/sales-order-multiple';

@Component({
  selector: 'create-salesorder',
  templateUrl: './create-salesorder.component.html',
  styleUrls: ['./create-salesorder.component.css']
})
export class CreateSalesorderComponent implements OnInit {

  salesOrderForm = new FormGroup({
    customerName: new FormControl(),
    customerPhone: new FormControl(),
    customerLineFb: new FormControl(),
    date: new FormControl(),
    receiverName: new FormControl(),
    receiverPhone: new FormControl(),
    receiverAddress: new FormControl(),
    receiveDateTime: new FormControl(),
    flowerFormula: new FormControl(),
    flowerAvailable: new FormControl(),
    orderTotal: new FormControl,
    flowerPrice: new FormControl(),
    deliveryFee: new FormControl(),
    totalPrice: new FormControl(),
    florist: new FormControl(),
    note: new FormControl()
  });


  dataArray = [];
  salesOrderMultiple = new SalesOrderMultiple();

  constructor(
    private restApiService: RestApiService
  ) { }

  flowerFormulas: FlowerFormula[] = [];
  florists: Florist[] = [];
  flowerAvailable: number = 0;
  floristSelected: string | undefined;
  flowerSelected: string | undefined;
  flowerQuantitySelected: string | undefined;
  createSalesOrder!: SalesOrderElement;


  ngOnInit(): void {

    this.salesOrderForm.controls['flowerPrice'].disable();
    this.salesOrderForm.controls['deliveryFee'].disable();
    this.salesOrderForm.controls['totalPrice'].disable();
    this.salesOrderForm.controls['flowerAvailable'].disable();

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

    this.salesOrderForm.controls["flowerFormula"].valueChanges.subscribe((val: number = 1) => {
      if (this.salesOrderForm.controls["flowerFormula"].value != null) {
        let floristId = 1;
        let totalOrder = 0;
        // let receiveDateTime = new Date();
        if (this.salesOrderForm.controls["florist"].value != null) {
          floristId = this.salesOrderForm.controls["florist"].value;
        }
        // if (this.salesOrderForm.controls["receiveDateTime"].value != null) {
        //   receiveDateTime = this.salesOrderForm.controls["receiveDateTime"].value;
        // }
        this.restApiService.getFlowerAvailable(val, floristId).subscribe((data: number) => {
          this.salesOrderForm.controls["flowerAvailable"].setValue(data);
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
        // let receiveDateTime = new Date();
        if (this.salesOrderForm.controls["flowerFormula"].value != null) {
          formulaId = this.salesOrderForm.controls["flowerFormula"].value;
        }
        // if (this.salesOrderForm.controls["receiveDateTime"].value != null) {
        //   receiveDateTime = this.salesOrderForm.controls["receiveDateTime"].value;
        // }
        this.restApiService.getFlowerAvailable(val, formulaId).subscribe((data: number) => {
          this.salesOrderForm.controls["flowerAvailable"].setValue(data);
        });

        this.restApiService.getSalesOrderPrice(formulaId, val, totalOrder).subscribe((data: SalesOrderPrice) => {
          this.salesOrderForm.controls["flowerPrice"].setValue(data.flowerPrice);
          this.salesOrderForm.controls["deliveryFee"].setValue(data.feePrice);
          this.salesOrderForm.controls["totalPrice"].setValue(data.totalPrice);
        });
      }
    });

    // this.salesOrderForm.controls["receiveDateTime"].valueChanges.subscribe((val: Date = new Date()) => {
    //   if (this.salesOrderForm.controls["receiveDateTime"].value != null) {
    //     let formulaId = 1;
    //     let floristId = 1;
    //     if (this.salesOrderForm.controls["flowerFormula"].value != null) {
    //       formulaId = this.salesOrderForm.controls["flowerFormula"].value;
    //     }
    //     if (this.salesOrderForm.controls["florist"].value != null) {
    //       floristId = this.salesOrderForm.controls["florist"].value;
    //     }
    //     this.restApiService.getFlowerAvailable(formulaId, formulaId, val).subscribe((data: number) => {
    //       this.salesOrderForm.controls["flowerAvailable"].setValue(data);
    //     });
    //   }
    // });

    this.salesOrderForm.controls["orderTotal"].valueChanges.subscribe((val: number = 0) => {
      if (this.salesOrderForm.controls["flowerAvailable"].value != null) {
        let formulaId = 1;
        let floristId = 1;
        if (this.salesOrderForm.controls["flowerFormula"].value != null) {
          formulaId = this.salesOrderForm.controls["flowerFormula"].value;
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
    this.createSalesOrder.flowerAvailable = this.salesOrderForm.controls["flowerAvailable"].value;
    console.warn(this.createSalesOrder);
    this.restApiService.createSalesOrder(this.createSalesOrder);
    this.salesOrderForm.reset();
  }

}
