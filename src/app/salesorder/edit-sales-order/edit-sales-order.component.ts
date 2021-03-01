import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Florist } from 'src/app/interface/florist';
import { FlowerAvailable } from 'src/app/interface/flower-available';
import { FlowerFormula } from 'src/app/interface/flower-formula';
import { SalesOrderElement } from 'src/app/interface/sales-order-element';
import { SalesOrderPrice } from 'src/app/interface/sales-order-price';
import { StatusOrder } from 'src/app/interface/status-order';
import { DialogData } from 'src/app/promotion/promotion.component';
import { RestApiService } from 'src/app/_shared/rest-api.service';
import { SalesorderComponent } from '../salesorder.component';

@Component({
  selector: 'edit-sales-order',
  templateUrl: './edit-sales-order.component.html',
  styleUrls: ['./edit-sales-order.component.css']
})
export class EditSalesOrderComponent implements OnInit {

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
    orderTotal: new FormControl(),
    flowerPrice: new FormControl(),
    deliveryFee: new FormControl(),
    totalPrice: new FormControl(),
    florist: new FormControl(),
    note: new FormControl(),
    status: new FormControl()
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
    numberOfOrder!: number;
    flowerAvailable: number = 0;
    floristSelected: string | undefined;
    flowerSelected: string | undefined;
    flowerQuantitySelected: string | undefined;
    statusSelected: string | undefined;
    salesOrderUpdated: any = {};
    updateSalesOrder!: SalesOrderElement;
  
  constructor(
    public dialogRef: MatDialogRef<SalesorderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SalesOrderElement,
    private restApiService: RestApiService,
  ) { }

  ngOnInit(): void {
    this.numberOfOrder = this.data.id;
    this.salesOrderForm.controls['flowerFormula'].disable();
    this.salesOrderForm.controls['florist'].disable();
    this.salesOrderForm.controls['orderTotal'].disable();
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
  }

  onUpdate(): void {
    this.dialogRef.close();
    this.updateSalesOrder = this.salesOrderForm.value;
    this.updateSalesOrder.flowerFormula = this.salesOrderForm.controls["flowerFormula"].value;
    this.updateSalesOrder.flowerPrice = this.salesOrderForm.controls["flowerPrice"].value;
    this.updateSalesOrder.deliveryFee = this.salesOrderForm.controls["deliveryFee"].value;
    this.updateSalesOrder.totalPrice = this.salesOrderForm.controls["totalPrice"].value;
    this.updateSalesOrder.id = this.numberOfOrder;
    console.log(this.updateSalesOrder);
    this.restApiService.updateSalesOrder(this.updateSalesOrder);
  }

}
