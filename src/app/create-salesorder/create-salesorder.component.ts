import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

interface FlowerAvaliable {
  value: string;
  viewValue: string;
}

interface FlowerFormula {
  value: string;
  viewValue: string;
}

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
    flowerPrice: new FormControl(),
    deliveryFee: new FormControl(),
    totalPrice: new FormControl(),
    forist: new FormControl(),
    total: new FormControl(),
    dateAvaliable: new FormControl(),
    note: new FormControl()
  });

  // myGroup = new FormGroup({
  //   firstName: new FormControl()
  // });
  
  constructor() { }

  ngOnInit(): void {
  }

  numberOfOrder: number = 5;

  selectedValue: string | undefined;

  flowerAvaliables: FlowerAvaliable[] = [
    {value: '1', viewValue: '1'},
    {value: '2', viewValue: '2'},
    {value: '3', viewValue: '3'}
  ];

  flowerFormulas: FlowerFormula[] = [
    {value: '1', viewValue: 'กุหลาบขาว ยูคา'},
    {value: '2', viewValue: 'กุหลาบแดง ยูคา'},
    {value: '3', viewValue: 'ทานตะวัน'}
  ];

  onSubmit(): void {
    this.salesOrderForm.reset();
  }

  
}
