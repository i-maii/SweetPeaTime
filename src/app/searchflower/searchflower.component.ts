//import { Component } from '@angular/core';
//import { Component, OnInit } from '@angular/core';
import { ThrowStmt } from '@angular/compiler';
import {AfterViewInit, Component, ViewChild} from '@angular/core';
import { FormControl, FormGroup, FormControlName } from '@angular/forms';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { FlowerFomular } from '../_models/flower-fomular';
import { FlowerFomularService } from '../_services/flower-fomular.service';
import { FormBuilder, Validators } from '@angular/forms';
import { FlowerFormula } from '../interface/flower-formula';


@Component({
  selector: 'searchflower',
  templateUrl:'./searchflower.component.html',
  styleUrls:['./searchflower.component.css']
})
/*export class SearchflowerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}*/
export class SearchflowerComponent implements AfterViewInit {
  
  displayedColumns: string[] = ['position', 'Fomular', 'Quantity','Florist', 'Price','deliveryFee', 'totalPrice'];
  dataSource = new MatTableDataSource<SearchFlowerFomularResult>(ELEMENT_DATA);
  /*flower = new FormControl();
  flowerList: string[] = ['', 'กุหลาบแดง', 'ทานตะวัน', 'ลิลลี่ขาว', 'ไฮเดรนเยียคราม', 'ไฮเดรนเยียชมพู'];
*/
  //flower = new FormControl();
  flowerList: string[] = ['WhiteRose', 'Redrose', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];
  flowerfomular = new FlowerFomular ();  
  private data: any;  

  SearchFlowerForm = new FormGroup({  
    flowerCat : new FormControl(''),
    flower : new FormControl(''), 
    occasion : new FormControl(''), 
    color : new FormControl(''), 
    date : new FormControl(''), 
    florist : new FormControl(''), 
    quantity : new FormControl(),
    priceFrom : new FormControl(''), 
    priceTo : new FormControl(''), 
    address  : new FormControl(''), 
  });
  
  constructor(private flowerfomularService : FlowerFomularService) { }  

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
   // this.getData(this.flowerfomular)
    this.dataSource.paginator = this.paginator;
  }
  selectedValue: string | undefined;

  flowerCat = [
    {value: '1', viewValue: 'ดอกไม้สด'},
    {value: '2', viewValue: 'ดอกไม้แห้ง'}
  ];

  flower = [
    {value: '1', viewValue: 'กุหลาบขาว'},
    {value: '2', viewValue: 'กุหลาบแดง'},
    {value: '3', viewValue: 'ทานตะวัน'}
  ];

  occasion = [
    {value: '1', viewValue: 'Congratulations'},
    {value: '2', viewValue: 'hospital'},
    {value: '3', viewValue: 'date'},
    {value: '4', viewValue: 'Wedding'},
    {value: '4', viewValue: 'Valentine'}
  ];

  color = [
    {value: '1', viewValue: 'ขาว'},
    {value: '2', viewValue: 'เหลือง'},
  ];


  flowerFormulas: FlowerFormula[] = [
    {value: '1', viewValue: 'กุหลาบขาว ยูคา'},
    {value: '2', viewValue: 'กุหลาบแดง ยูคา'},
    {value: '3', viewValue: 'ทานตะวัน'}
  ];

  florist : FlowerFormula[] = [
    {value: '1', viewValue: 'หนึ่ง'},
    {value: '2', viewValue: 'ซงหนิงหนิง'}
  ];

  getData(flowerfomular: FlowerFomular)  
  {  
      // this.flowerfomularService.getData(flowerfomular).subscribe(  
      //   (        response: { json: () => any; }) => {  
      //     this.data = response.json();  
      //   },  
      //   (        error: any) => {  
      //     console.log("error while getting user Details");  
      //   }  
      // );  
  }
  
  searchForm()  
  {  
    console.warn(this.SearchFlowerForm.value);
   // searchInfo = new FlowerFomular ();  
    //searchInfo.flower = 'Whiterose';
    //searchInfo.quantity= 2;
      //  this.flowerfomular.name = this.Name.value;  
       // this.flowerfomular.quantity= this.Quantity.value; 
       // this.getData(this.flowerfomular);  
  }  
  
  get Name()  
  {  
    return this.SearchFlowerForm.get('flower');  
  }  
  
  get Quantity()  
  {  
    return this.SearchFlowerForm.get('quantity');  
  }  

}

export interface SearchFlowerFomularResult {
  position: number 
  name: string;
  quantity: number;
  florist: string;
  price: number;
  deliveryFee: number;
  totalPrice : number;
}

const ELEMENT_DATA: SearchFlowerFomularResult[] = [
  {position: 1, name: 'Hydrogen',quantity: 1, florist: 'หนึ่ง', price: 1.0079,  deliveryFee: 100, totalPrice : 100},
  {position: 2, name: 'Helium', quantity: 1,florist: 'หนึ่ง', price: 1.0079,   deliveryFee: 100, totalPrice : 100},
  {position: 3, name: 'Lithium',quantity: 1,florist: 'หนึ่ง', price: 1.0079,  deliveryFee: 100, totalPrice : 100},
  {position: 4, name: 'Beryllium',quantity: 1, florist: 'หนึ่ง', price: 9.0122, deliveryFee: 100, totalPrice : 100},
  {position: 5, name: 'Boron',quantity: 1, florist: 'หนึ่ง', price: 10.811, deliveryFee: 100, totalPrice : 100},
  {position: 6, name: 'Carbon',quantity: 1,florist: 'หนึ่ง',  price: 12.0107, deliveryFee: 100,totalPrice : 100},
  {position: 7, name: 'Nitrogen',quantity: 1,florist: 'หนึ่ง', price: 14.0067,  deliveryFee: 100,totalPrice : 100},
  {position: 8,name: 'Oxygen', quantity: 1,florist: 'หนึ่ง', price: 15.9994, deliveryFee: 100,totalPrice : 100},
  {position: 9, name: 'Fluorine', quantity: 1, florist: 'หนึ่ง',price: 18.9984,  deliveryFee: 100,totalPrice : 100},
  {position: 10, name: 'Neon', quantity: 1,florist: 'หนึ่ง', price: 20.1797,  deliveryFee: 100,totalPrice : 100},
  {position: 11, name: 'Sodium', quantity: 1,florist: 'หนึ่ง', price: 22.9897, deliveryFee: 100,totalPrice : 100},
  {position: 12, name: 'Magnesium',quantity: 1,florist: 'หนึ่ง', price: 24.305, deliveryFee: 100,totalPrice : 100},
  {position: 13, name: 'Aluminum', quantity: 1,florist: 'หนึ่ง', price: 26.9815,  deliveryFee: 100,totalPrice : 100},
  {position: 14,name: 'Silicon', quantity: 1,florist: 'หนึ่ง', price: 28.0855,  deliveryFee: 100,totalPrice : 100},
  {position: 15, name: 'Phosphorus',quantity: 1,florist: 'หนึ่ง', price: 35.453, deliveryFee: 100,totalPrice : 100},
  {position: 18, name: 'Argon', quantity: 1,florist: 'หนึ่ง', price: 39.948,  deliveryFee: 100,totalPrice : 100},
  {position: 19, name: 'Potassium',quantity: 1,florist: 'หนึ่ง', price: 39.0983, deliveryFee: 100,totalPrice : 100},
  {position: 20, name: 'Calcium',quantity: 1, florist: 'หนึ่ง', price: 40.078,  deliveryFee: 100,totalPrice : 100},
];