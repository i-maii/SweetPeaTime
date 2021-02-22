//import { Component } from '@angular/core';
//import { Component, OnInit } from '@angular/core';
import {AfterViewInit, Component, ViewChild} from '@angular/core';
import { FormControl, FormGroup, FormControlName } from '@angular/forms';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { FlowerFormula } from '../interface/flower-formula';
import { FlowerFomular } from '../_models/flower-fomular';
import { RestApiService } from '../_shared/rest-api.service';

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
  
 // ELEMENT_DATA: SearchFlowerFomularResult[] = [];
  flowerFormula: FlowerFormula[] = [];
  flowerFormulaSearch: FlowerFormula[] = [];
  displayedColumns: string[] = ['name','quantityAvailable','pattern', 'price','size','occasion'];
 // dataSource = new MatTableDataSource<SearchFlowerFomularResult>();
  dataSource = new MatTableDataSource<FlowerFormula>();
  /*flower = new FormControl();
  flowerList: string[] = ['', 'กุหลาบแดง', 'ทานตะวัน', 'ลิลลี่ขาว', 'ไฮเดรนเยียคราม', 'ไฮเดรนเยียชมพู'];
*/
  //flower = new FormControl();
  flowerList: string[] = ['WhiteRose', 'Redrose', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];
  flowerFormulas: FlowerFormula[] = [];
  private data: any;  

  searchFlowerForm = new FormGroup({  
    flowerCat : new FormControl(''),
    name : new FormControl(''), 
    occasion : new FormControl(''), 
    color : new FormControl(''), 
    date : new FormControl(''), 
    pattern : new FormControl(''), 
    quantity : new FormControl(),
    priceFrom : new FormControl(''), 
    priceTo : new FormControl(''), 
    address  : new FormControl(''), 
  });
  

  
  constructor(private restApiService: RestApiService) { }  

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
   // this.getData(this.flowerfomular)\
    this.flowerFormula = [];
    this.restApiService.searchAllFlowerFormula().subscribe((data: FlowerFormula[]) => {
      for (let i = 0; i < data.length; i++) {
        this.flowerFormula.push(data[i]);
      }
      this.dataSource = new MatTableDataSource<FlowerFormula>(this.flowerFormula);
    })

    this.dataSource.paginator = this.paginator;
  }
  // applyFilter(searchFlowerForm: any) {
  //   const filterValue = (searchFlowerForm.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();
  // }

  selectedValue: string | undefined;

  flowerCat = [
    {value: '1', viewValue: ''},
    {value: '2', viewValue: 'ดอกไม้สด'},
    {value: '3', viewValue: 'ดอกไม้แห้ง'}
  ];

  flower = [
    {value: '1', viewValue: 'กุหลาบขาว'},
    {value: '2', viewValue: 'กุหลาบแดง'},
    {value: '3', viewValue: 'กุหลาบชมพู'},
    {value: '4', viewValue: 'ทานตะวัน'},
    {value: '5', viewValue: 'ไฮเดรนเยีย'}
  ];

  occasion = [
    {value: '1', viewValue: 'Congratulations'},
    {value: '2', viewValue: 'hospital'},
    {value: '3', viewValue: 'Birthday'},
    {value: '4', viewValue: 'Wedding'},
    {value: '4', viewValue: 'Valentine'}
  ];

  color = [
    {value: '1', viewValue: 'ขาว'},
    {value: '2', viewValue: 'เหลือง'}
  ];
  pattern = [
    {value: '1', viewValue: ''},
    {value: '2', viewValue: 'เกาหลี'},
    {value: '3', viewValue: 'ทั่วไป'}
  ];

  
  searchForm()  
  {
    this.restApiService.searchFlowerFormula(this.searchFlowerForm.value).subscribe((data: FlowerFormula[]) => {
      console.log(this.searchFlowerForm.value);
      this.flowerFormulaSearch = [];
      for (let i = 0; i < data.length; i++) {
        this.flowerFormulaSearch.push(data[i]);
  
      }
    
      this.dataSource = new MatTableDataSource<FlowerFormula>(this.flowerFormulaSearch);    
  //  this.dataSource = new MatTableDataSource<FlowerFormula>(this.flowerFormulas);

      console.warn(this.searchFlowerForm.value);
    })  
  }
}
export interface searchFlowerFomularResult {
  position: number 
  name: string;
  quantity: number;
  florist: string;
  price: number;
  deliveryFee: number;
  totalPrice : number;
}

