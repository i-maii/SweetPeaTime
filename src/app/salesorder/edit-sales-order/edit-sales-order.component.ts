import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Florist } from 'src/app/interface/florist';
import { FlowerFormula } from 'src/app/interface/flower-formula';
import { SalesOrderDetailListDto } from 'src/app/interface/sales-order-detail-list-dto';
import { SalesOrderElement } from 'src/app/interface/sales-order-element';
import { SalesOrderPrice } from 'src/app/interface/sales-order-price';
import { StatusOrder } from 'src/app/interface/status-order';
import { RestApiService } from 'src/app/_shared/rest-api.service';
import { SalesorderComponent } from '../salesorder.component';

@Component({
  selector: 'edit-sales-order',
  templateUrl: './edit-sales-order.component.html',
  styleUrls: ['./edit-sales-order.component.css']
})
export class EditSalesOrderComponent implements OnInit {

  // salesOrderForm = new FormGroup({
  //   customerName: new FormControl(),
  //   customerPhone: new FormControl(),
  //   customerLineFb: new FormControl(),
  //   date: new FormControl(),
  //   receiverName: new FormControl(),
  //   receiverPhone: new FormControl(),
  //   receiverAddress: new FormControl(),
  //   receiveDateTime: new FormControl(),
  //   // flowerFormula: new FormControl(),
  //   // orderTotal: new FormControl(),
  //   // flowerPrice: new FormControl(),
  //   deliveryFee: new FormControl(),
  //   totalPrice: new FormControl(),
  //   florist: new FormControl(),
  //   note: new FormControl(),
  //   status: new FormControl(),
  //   flowerMultipleForms: new FormArray([]),
  // });

  arr: any;
  salesOrderForm: FormGroup;
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
    @Inject(MAT_DIALOG_DATA) public data: SalesOrderDetailListDto,
    private restApiService: RestApiService,
    private fb: FormBuilder,
    private datepipe: DatePipe,
  ) { 
    this.salesOrderForm = this.fb.group({
      customerName: this.data.customerName,
      customerPhone: this.data.customerPhone,
      customerLineFb: this.data.customerLineFb,
      date: this.data.date,
      receiverName: this.data.receiverName,
      receiverPhone: this.data.receiverPhone,
      receiverAddress: this.data.receiverAddress,
      receiveDateTime: this.datepipe.transform(this.data.receiveDateTime, 'yyyy-MM-dd')+"",
      flowerPrice: this.data.flowerPrice,
      deliveryFee: this.data.deliveryFee,
      totalPrice: this.data.totalPrice,
      florist: this.data.salesOrderDetails[0].florist.name,
      note: this.data.note,
      status: this.data.status,
      flowerMultipleDtoList: this.fb.array([new FormGroup({
        flowerFormula: new FormControl(this.data.salesOrderDetails[0].flowerFormula.name),
        orderTotal: new FormControl(this.data.salesOrderDetails[0].quantity),
      })
      ])
    });
  }

  ngOnInit(): void {
    console.log(this.data);
    this.numberOfOrder = this.data.id;
    this.salesOrderForm.controls['flowerPrice'].disable();
    this.salesOrderForm.controls['deliveryFee'].disable();
    this.salesOrderForm.controls['totalPrice'].disable();
    this.salesOrderForm.controls['florist'].disable();
    this.salesOrderForm.controls['receiveDateTime'].disable();

    if (this.data.salesOrderDetails.length !== 1) {
      const flowerMultiple = this.salesOrderForm.controls.flowerMultipleDtoList as FormArray;
      for (let i = 1; i < this.data.salesOrderDetails.length; i++) {
        flowerMultiple.push(this.fb.group({
          flowerFormula: this.data.salesOrderDetails[i].flowerFormula.name,
          orderTotal: this.data.salesOrderDetails[i].quantity,
        }));
      }
    }

    this.arr = this.salesOrderForm.controls.flowerMultipleDtoList.value;
  }

  onUpdate(): void {
    this.dialogRef.close();
    this.updateSalesOrder = this.salesOrderForm.value;
    for (let i=0; i<this.salesOrderForm.controls.flowerMultipleDtoList.value.length; i++) {
      this.updateSalesOrder.flowerMultipleDtoList[i].flowerFormula = this.salesOrderForm.controls.flowerMultipleDtoList.value[i].flowerFormula.id;
    }
    this.updateSalesOrder.flowerPrice = this.salesOrderForm.controls["flowerPrice"].value;
    this.updateSalesOrder.deliveryFee = this.salesOrderForm.controls["deliveryFee"].value;
    this.updateSalesOrder.totalPrice = this.salesOrderForm.controls["totalPrice"].value;
    this.updateSalesOrder.id = this.numberOfOrder;
    console.log(this.updateSalesOrder);
    this.restApiService.updateSalesOrder(this.updateSalesOrder);
  }
}
