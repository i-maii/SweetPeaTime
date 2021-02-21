import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Florist } from '../interface/florist';
import { FlowerAvailable } from '../interface/flower-available';
import { FlowerFormula } from '../interface/flower-formula';
import { SalesOrderPrice } from '../interface/sales-order-price';
import { RestApiService } from '../_shared/rest-api.service';
import { StatusOrder } from '../interface/status-order';

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
    flowerPrice: new FormControl(),
    deliveryFee: new FormControl(),
    totalPrice: new FormControl(),
    florist: new FormControl(),
    note: new FormControl(),
    status: new FormControl
  });
  
  statusOrders: StatusOrder[] = [
    {value: 'จ่ายแล้ว', name: 'จ่ายแล้ว'},
    {value: 'กำลังจัดช่อดอกไม้', name: 'กำลังจัดช่อดอกไม้'},
    {value: 'จัดเสร็จแล้ว', name: 'จัดเสร็จแล้ว'},
    {value: 'ส่งแล้ว', name: 'ส่งแล้ว'},
    {value: 'ยกเลิกออเดอร์', name: 'ยกเลิกออเดอร์'}
  ];

  flowerFormulas: FlowerFormula[] = [];
  florists: Florist[] = [];
  numberOfOrder: number | undefined;
  flowerAvailables: FlowerAvailable[] = [];
  floristSelected: string | undefined;
  flowerSelected: string | undefined;
  flowerQuantitySelected: string | undefined;
  statusSelected: string | undefined;

  constructor(
    private restApiService: RestApiService
  ) { }

  ngOnInit(): void {

    this.salesOrderForm.controls['flowerPrice'].disable();
    this.salesOrderForm.controls['deliveryFee'].disable();
    this.salesOrderForm.controls['totalPrice'].disable();
    this.salesOrderForm.controls['orderDate'].disable();

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
    console.warn(this.salesOrderForm.value);  
    this.salesOrderForm.reset();
  }

}
