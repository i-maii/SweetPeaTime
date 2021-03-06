import { Component, OnInit, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { FlowerFormula } from '../interface/flower-formula'
import { Florist } from '../interface/florist'
import { RestApiService } from '../_shared/rest-api.service';
import { FlowerAvailable } from '../interface/flower-available';
import { SalesOrderPrice } from '../interface/sales-order-price';
import { SalesOrderElement } from '../interface/sales-order-element';
import { SalesOrderMultiple } from '../interface/sales-order-multiple';
import { DatePipe } from '@angular/common';

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
    flowerPrice: new FormControl(),
    deliveryFee: new FormControl(),
    totalPrice: new FormControl(),
    florist: new FormControl(),
    note: new FormControl(),
  });


  dataArray = [];
  salesOrderMultiple: SalesOrderMultiple | undefined;

  flowerMultipleForms = new FormArray([]);
  arr: any;

  constructor(
    private restApiService: RestApiService,
    private fb: FormBuilder
  ) {
    this.salesOrderForm = this.fb.group({
      customerName: new FormControl(),
      customerPhone: new FormControl(),
      customerLineFb: new FormControl(),
      date: new FormControl(),
      receiverName: new FormControl(),
      receiverPhone: new FormControl(),
      receiverAddress: new FormControl(),
      receiveDateTime: new FormControl(),
      flowerPrice: new FormControl(),
      deliveryFee: new FormControl(),
      totalPrice: new FormControl(),
      florist: new FormControl(),
      note: new FormControl(),
      flowerMultipleForms: this.fb.array([new FormGroup({
        flowerFormula: new FormControl(),
        flowerAvailable: new FormControl(),
        orderTotal: new FormControl(),
      })
      ])
    });
  }

  addFlowerMultipleForm() {
    const data = this.salesOrderForm.controls.flowerMultipleForms as FormArray;
    data.push(this.fb.group({
      flowerFormula: null,
      flowerAvailable: null,
      orderTotal: null
    }));
    this.arr = this.salesOrderForm.controls.flowerMultipleForms.value;
  }

  removeFlowerMultiple(i: number) {
    const data = this.salesOrderForm.controls.flowerMultipleForms as FormArray;
    data.removeAt(i);
    this.arr = this.salesOrderForm.controls.flowerMultipleForms.value;
  }

  flowerFormulas: FlowerFormula[] = [];
  florists: Florist[] = [];
  flowerAvailable: number = 0;
  floristSelected: string | undefined;
  flowerSelected: string | undefined;
  flowerQuantitySelected: string | undefined;
  createSalesOrder!: SalesOrderElement;


  ngOnInit(): void {

    this.arr = this.salesOrderForm.controls.flowerMultipleForms.value;
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


    this.salesOrderForm.controls["flowerMultipleForms"]?.valueChanges.subscribe((val) => {
      let floristId = 0;
      let totalOrder = 0;
      let formulaId = 0;
      let receiveDateTime = new Date();

      for (let i = 0; i < this.salesOrderForm.controls.flowerMultipleForms.value.length; i++) {
        if (this.salesOrderForm.controls.flowerMultipleForms.value[i].flowerFormula != null
          && this.salesOrderForm.controls["florist"].value != null
          && this.salesOrderForm.controls["receiveDateTime"].value != null) {

          floristId = this.salesOrderForm.controls["florist"].value;
          receiveDateTime = this.salesOrderForm.controls["receiveDateTime"].value;
          formulaId = this.salesOrderForm.controls.flowerMultipleForms.value[i].flowerFormula;

          this.restApiService.getFlowerAvailable(formulaId, floristId, receiveDateTime).subscribe((data: number) => {
            ((this.salesOrderForm.get('flowerMultipleForms') as FormArray).at(i) as FormGroup).get('flowerAvailable')?.patchValue(data);
          });
        }
      }

      for (let i = 0; i < this.salesOrderForm.controls.flowerMultipleForms.value.length; i++) {
        if (this.salesOrderForm.controls.flowerMultipleForms.value[i].orderTotal != null
          && this.salesOrderForm.controls["florist"].value != null
          && this.salesOrderForm.controls["receiveDateTime"].value != null) {

          floristId = this.salesOrderForm.controls["florist"].value;
          receiveDateTime = this.salesOrderForm.controls["receiveDateTime"].value;
          totalOrder = this.salesOrderForm.controls.flowerMultipleForms.value[i].orderTotal;

          this.restApiService.getSalesOrderPrice(formulaId, floristId, totalOrder).subscribe((data: SalesOrderPrice) => {
            this.salesOrderForm.controls["flowerPrice"].setValue(data.flowerPrice);
            this.salesOrderForm.controls["deliveryFee"].setValue(data.feePrice);
            this.salesOrderForm.controls["totalPrice"].setValue(data.totalPrice);
          });
        }
      }
    });

    // this.salesOrderForm.controls["florist"].valueChanges.subscribe((val: number = 1) => {
    //   if (this.salesOrderForm.controls["florist"].value != null) {
    //     let formulaId = 0;
    //     let totalOrder = 0;
    //     let receiveDateTime = new Date();

    //     val = this.salesOrderForm.controls["florist"].value;

    //     // for (let i = 0; i < this.flowerMultipleForms.length; i++) {
    //     if (this.salesOrderForm.get("flowerMultipleForms")?.value[0].flowerFormula != null
    //       && this.salesOrderForm.controls["receiveDateTime"].value != null) {
    //       receiveDateTime = this.salesOrderForm.controls["receiveDateTime"].value;
    //       formulaId = this.salesOrderForm.get("flowerMultipleForms")?.value[0].flowerFormula;
    //       this.restApiService.getFlowerAvailable(val, formulaId, receiveDateTime).subscribe((data: number) => {
    //         this.flowerAvailable = data;
    //       });
    //       // }
    //     }

    //     // for (let i = 0; i < this.flowerMultipleForms.length; i++) {
    //     if (this.salesOrderForm.get("flowerMultipleForms")?.value[0].orderTotal != null) {
    //       totalOrder = this.salesOrderForm.get("flowerMultipleForms")?.value[0].orderTotal;
    //       this.restApiService.getSalesOrderPrice(formulaId, val, totalOrder).subscribe((data: SalesOrderPrice) => {
    //         this.salesOrderForm.controls["flowerPrice"].setValue(data.flowerPrice);
    //         this.salesOrderForm.controls["deliveryFee"].setValue(data.feePrice);
    //         this.salesOrderForm.controls["totalPrice"].setValue(data.totalPrice);
    //       });
    //     }
    //     // }
    //   }

    // });

    // this.salesOrderForm.controls["receiveDateTime"].valueChanges.subscribe((val) => {
    //   if (this.salesOrderForm.controls["receiveDateTime"].value != null) {
    //     let formulaId = 1;
    //     let floristId = 1;

    //     if (this.salesOrderForm.controls["florist"].value != null) {
    //       floristId = this.salesOrderForm.controls["florist"].value;
    //     }

    //     for (let i = 0; i < this.flowerMultipleForms.length; i++) {
    //       if (this.salesOrderForm.get("flowerMultipleForms")?.value[i].flowerFormula != null) {
    //         formulaId = this.salesOrderForm.get("flowerMultipleForms")?.value[i].flowerFormula;
    //         this.restApiService.getFlowerAvailable(formulaId, floristId, val).subscribe((data: number) => {
    //           this.flowerAvailable = data;
    //         });
    //       }
    //     }

    //   }
    // });

  }

  onSubmit(): void {
    this.createSalesOrder = this.salesOrderForm.value;
    this.createSalesOrder.flowerPrice = this.salesOrderForm.controls["flowerPrice"].value;
    this.createSalesOrder.deliveryFee = this.salesOrderForm.controls["deliveryFee"].value;
    this.createSalesOrder.totalPrice = this.salesOrderForm.controls["totalPrice"].value;
    // this.createSalesOrder.flowerAvailable = this.salesOrderForm.controls["flowerAvailable"].value;
    console.warn(this.createSalesOrder);
    console.log(this.flowerMultipleForms.value);
    // this.restApiService.createSalesOrder(this.createSalesOrder);
    this.salesOrderForm.reset();
  }

}
