import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Florist } from '../interface/florist';
import { FlowerAvailable } from '../interface/flower-available';
import { FlowerFormula } from '../interface/flower-formula';
import { SalesOrderPrice } from '../interface/sales-order-price';
import { RestApiService } from '../_shared/rest-api.service';
import { StatusOrder } from '../interface/status-order';
import { SalesOrderElement } from '../interface/sales-order-element';
import { SalesorderService } from '../salesorder/salesorder.service';
import { CreateSalesOrder } from '../interface/create-sales-order';

@Component({
  selector: 'edit-salesorder',
  templateUrl: './edit-salesorder.component.html',
  styleUrls: ['./edit-salesorder.component.css']
})
export class EditSalesorderComponent implements OnInit {

  salesOrderForm = new FormGroup({
    orderFirstName: new FormControl(''),
    orderLastName: new FormControl(''),
    orderPhone: new FormControl(''),
    orderDate: new FormControl(''),
    receiverFirstName: new FormControl(''),
    receiverLastName: new FormControl(''),
    receiverPhone: new FormControl(''),
    receiverAddress: new FormControl(''),
    receiveDate: new FormControl(''),
    flowerFormular: new FormControl(''),
    flowerAvailable: new FormControl(''),
    flowerPrice: new FormControl(''),
    deliveryFee: new FormControl(''),
    totalPrice: new FormControl(''),
    florist: new FormControl(''),
    note: new FormControl(''),
    status: new FormControl('')
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
  salesOrderUpdated: SalesOrderElement | any;

  updateSalesOrder!: CreateSalesOrder;

  constructor(
    private restApiService: RestApiService,
    private salesOrderService: SalesorderService
  ) { }

  ngOnInit(): void {
    this.salesOrderForm.controls['orderFirstName'].setValue("Jee");
    
    this.salesOrderService.$isUpdateSalesOrder.subscribe((data) => {
      console.log(data);

      this.salesOrderUpdated = data;
      // this.numberOfOrder = data.id;
      
      // this.salesOrderForm.controls['orderFirstName'].setValue(data.customerFirstName);
      // this.salesOrderForm.controls['orderLastName'].setValue(data.customerLastName);
      // this.salesOrderForm.controls['orderPhone'].setValue(data.customerPhone);
      // this.salesOrderForm.controls['orderDate'].setValue(data.date);
      // this.salesOrderForm.controls['receiverFirstName'].setValue(data.receiverFirstName);
      // this.salesOrderForm.controls['receiverLastName'].setValue(data.receiverLastName);
      // this.salesOrderForm.controls['receiverPhone'].setValue(data.receiverPhone);
      // this.salesOrderForm.controls['receiverAddress'].setValue(data.receiverAddress);
      // this.salesOrderForm.controls['receiveDate'].setValue(data.receiveDateTime);
      // this.salesOrderForm.controls['flowerFormular'].setValue(data.flowerFormula);
      // this.salesOrderForm.controls['flowerAvailable'].setValue(data.flowerAvailable);
      // this.salesOrderForm.controls['flowerPrice'].setValue(data.flowerPrice);
      // this.salesOrderForm.controls['deliveryFee'].setValue(data.deliveryFee);
      // this.salesOrderForm.controls['totalPrice'].setValue(data.totalPrice);
      // this.salesOrderForm.controls['florist'].setValue(data.floristId);
      // this.salesOrderForm.controls['note'].setValue(data.note);
      // this.salesOrderForm.controls['status'].setValue(data.status);
    });

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
    this.updateSalesOrder = this.salesOrderForm.value;
    this.updateSalesOrder.flowerPrice = this.salesOrderForm.controls["flowerPrice"].value;
    this.updateSalesOrder.deliveryFee = this.salesOrderForm.controls["deliveryFee"].value;
    this.updateSalesOrder.totalPrice = this.salesOrderForm.controls["totalPrice"].value;
    console.warn(this.updateSalesOrder);  
    this.salesOrderForm.reset();
  }

}
