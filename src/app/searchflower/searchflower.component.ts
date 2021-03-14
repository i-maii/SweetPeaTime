

//import { Component } from '@angular/core';
//import { Component, OnInit } from '@angular/core';
import {AfterViewInit, Component, ViewChild} from '@angular/core';
import { FormControl, FormGroup, FormControlName } from '@angular/forms';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { FlowerFormula } from '../interface/flower-formula';
import { SearchFlowerFormulaResult } from '../interface/searchFlowerFormulaResult';
import { FlowerFomular } from '../_models/flower-fomular';
import { RestApiService } from '../_shared/rest-api.service';
//import { googlemaps } from '@types/googlemaps/reference/distance-matrix.d.ts';
import { google } from 'google-maps';
// declare var google: any;
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
  [x: string]: any;
  // Load google maps script after view init

  flowerFormula: FlowerFormula[] = [];
  flowerFormulaSearch: FlowerFormula[] = [];
  displayedColumns: string[] = ['position','name','quantityAvailable','pattern','color','size','occasion','florist','price','deliveryFee', 'totalPrice'];
  searchFlowerFormulaResult: SearchFlowerFormulaResult[] = [];
  searchFlowerFormulaFlorist: SearchFlowerFormulaResult[] = [];
  deliveryFee: any = 0;
  dataSource = new MatTableDataSource<SearchFlowerFormulaResult>();
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
    size  : new FormControl(''), 
    florist  : new FormControl('')
  });
  test: any;
  

  
  constructor(private restApiService: RestApiService) { }  

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
   // this.getData(this.flowerfomular)\
   this.searchFlowerFormulaFlorist = [];
    this.flowerFormula = [];
    this.restApiService.searchAllFlowerFormula().subscribe((data: FlowerFormula[]) => {
      for (let i = 0; i < data.length; i++) {
        let searchResult: {
          id: number,
          position: number, 
          florist: string,
          name: string,
          size: string,
          pattern: string,
          color: string,
          price: number,
          occasion: string,
          quantityAvailable: string,
          deliveryFee: number,
          totalPrice : number
         } = { 
         id: 0, 
         position: 0, 
         florist: '',
         name: '',
         size: '',
         pattern: '',
         color: '',
         price: 0,
         occasion: '',
         quantityAvailable: '',
         deliveryFee: 0,
         totalPrice : 0   
        };
         searchResult.id = i;
         searchResult.position = i;
         searchResult.florist= "ซงหนิง";
         searchResult.name = data[i].name;
         searchResult.size = data[i].size;
         searchResult.pattern = data[i].pattern;
         searchResult.color = data[i].color;
         searchResult.price = data[i].price;
         searchResult.occasion = data[i].occasion;
         searchResult.quantityAvailable = data[i].quantityAvailable;
         searchResult.deliveryFee = 0;
         searchResult.totalPrice = data[i].price;
  
         

         if (data[i].pattern == 'เกาหลี')
              {
                searchResult.florist =  'ซงหนิงหนิง';
                  //find quantity availbale
                  // this.restApiService.getFlowerAvailable(data[i].id, 1).subscribe((result) => {
                  // searchResult.quantityAvailable = "2";})
              }
              else
              {
                searchResult.florist = 'หนึ่ง';
              //find quantity available for neung
              // this.restApiService.getFlowerAvailable(data[i].id, 2).subscribe((result) => {
              //   searchResult.quantityAvailable = "5";})
              //Add new row for new florist
              let resultRow : {
                id: number,
                position: number, 
                florist: string,
                name: string,
                size: string,
                pattern: string,
                color: string,
                price: number,
                occasion: string,
                quantityAvailable: string,
                deliveryFee: number,
                totalPrice : number
              } = { 
                id: 0, 
              position: 0, 
              florist: '',
              name: '',
              size: '',
              pattern: '',
              color: '',
              price: 0,
              occasion: '',
              quantityAvailable: '',
              deliveryFee: 0,
              totalPrice : 0   
              };
              resultRow.id = data[i].id;
              resultRow.position = i;
              resultRow.florist= "ซงหนิงหนิง";
              resultRow.name = data[i].name;
              resultRow.size = data[i].size;
              resultRow.pattern = data[i].pattern;
              resultRow.color = data[i].color;
              resultRow.price = data[i].price;
              resultRow.occasion = data[i].occasion;
              resultRow.quantityAvailable = data[i].quantityAvailable;
              resultRow.deliveryFee = 0;
              resultRow.totalPrice = data[i].price;
              //find quantity available for nink
              // this.restApiService.getFlowerAvailable(data[i].id, 1).subscribe((result) => {
              // this.resultRow.quantityAvailable = "3";})
              this.searchFlowerFormulaFlorist.push(resultRow);
              }
              this.searchFlowerFormulaResult.push(searchResult);
      }
      this.searchFlowerFormulaResult = this.searchFlowerFormulaResult.concat(this.searchFlowerFormulaFlorist);
      this.searchFlowerFormulaResult.sort((a,b)=> a.name.localeCompare(b.name));
      for (let i = 0 ; i < this.searchFlowerFormulaResult.length ; i++)
      {
        this.searchFlowerFormulaResult[i].position = i+1;
      }
      this.dataSource = new MatTableDataSource<SearchFlowerFormulaResult>(this.searchFlowerFormulaResult);
      this.dataSource.paginator = this.paginator;
    });
  }

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
    {value: '4', viewValue: 'กุหลาบมาแชล'},
    {value: '5', viewValue: 'ทานตะวัน'},
    {value: '6', viewValue: 'ไฮเดนเยีย'}
  ];

  occasion = [
    {value: '1', viewValue: 'Congratulations'},
    {value: '2', viewValue: 'hospital'},
    {value: '3', viewValue: 'Birthday'},
    {value: '4', viewValue: 'Wedding'},
    {value: '4', viewValue: 'Valentine'}
  ];

  color = [
    {value: '1', viewValue: ''},
    {value: '2', viewValue: 'เหลือง'},
    {value: '2', viewValue: 'ขาว'},
    {value: '2', viewValue: 'ชมพู'},
    {value: '2', viewValue: 'แดง'},
  ];
  pattern = [
    {value: '1', viewValue: ''},
    {value: '2', viewValue: 'เกาหลี'},
    {value: '3', viewValue: 'ทั่วไป'}
  ];
  florist = [
    {value: '1', viewValue: ''},
    {value: '2', viewValue: 'ซงหนิงหนิง'},
    {value: '3', viewValue: 'หนึ่ง'}
  ];
  
  searchForm()  
  {
    this.searchFlowerFormulaResult = [];
    this.searchFlowerFormulaFlorist = [];
    this.restApiService.searchFlowerFormula(this.searchFlowerForm.value).subscribe((data: FlowerFormula[]) => {
      console.log(this.searchFlowerForm.value);
      this.flowerFormulaSearch = [];
      if (data !=null)
      {
        for (let i = 0; i < data.length; i++) {
        
        let searchResult: {
          id: number,
          position: number, 
          florist: string,
          name: string,
          size: string,
          pattern: string,
          color: string,
          price: number,
          occasion: string,
          quantityAvailable: string,
          deliveryFee: number,
          totalPrice : number
        } = { 
          id: 0, 
        position: 0, 
        florist: '',
        name: '',
        size: '',
        pattern: '',
        color: '',
        price: 0,
        occasion: '',
        quantityAvailable: '',
        deliveryFee: 0,
        totalPrice : 0   
        };
        searchResult.id = data[i].id;
        searchResult.position = i;
        searchResult.florist= "ซงหนิง";
        searchResult.name = data[i].name;
        searchResult.size = data[i].size;
        searchResult.pattern = data[i].pattern;
        searchResult.color = data[i].color;
        searchResult.price = data[i].price;
        searchResult.occasion = data[i].occasion;
        searchResult.quantityAvailable = data[i].quantityAvailable;
        searchResult.deliveryFee = 200;
        searchResult.totalPrice = 0;

        this.searchFlowerFormulaResult.push(searchResult);
      //   this.searchFlowerFomularResult.push((i.toString(),data[i].name, data[i].name, data[i].occasion, data[i].pattern, data[i].price, data[i].quantityAvailable, data[i].size);
      }
    }
  
    var result;
    this.restApiService.calculateDeliveryFee("area").subscribe((result) => {
      this.deliveryFee = result;})
  
    let totalPrice = 0;
      for (let i = 0; i < this.searchFlowerFormulaResult.length; i++) {
        let price: Array<number> = [];
        totalPrice = 0;
        price.push(Number(this.searchFlowerFormulaResult[i].price));
        if (price.length > 0)
        {
          this.restApiService.calculateTotalPrice(this.deliveryFee, price).subscribe((totalPrice) => {
          //this.searchFlowerFormulaResult[i].totalPrice = Number(totalPrice);
          this.searchFlowerFormulaResult[i].position = i+1;
          this.searchFlowerFormulaResult[i].deliveryFee = this.deliveryFee;
          this.price= [];
                  })
          this.searchFlowerFormulaResult[i].totalPrice = this.searchFlowerFormulaResult[i].price + this.deliveryFee;
        
              if (this.searchFlowerFormulaResult[i].pattern == 'เกาหลี')
              {
                this.searchFlowerFormulaResult[i].florist =  'ซงหนิงหนิง';
                  //find quantity availbale
              //  this.restApiService.getFlowerAvailable(this.searchFlowerFormulaResult[i].id, 1).subscribe((result) => {
                this.searchFlowerFormulaResult[i].quantityAvailable = "2";
            //  })

              }
              else
              {
              this.searchFlowerFormulaResult[i].florist = 'หนึ่ง';
               //find quantity available for neung
             // this.restApiService.getFlowerAvailable(this.searchFlowerFormulaResult[i].id, 2).subscribe((result) => {
              this.searchFlowerFormulaResult[i].quantityAvailable = "5";
            //})
              let resultRow : {
                id: number,
                position: number, 
                florist: string,
                name: string,
                size: string,
                pattern: string,
                color: string,
                price: number,
                occasion: string,
                quantityAvailable: string,
                deliveryFee: number,
                totalPrice : number
              } = { 
                id: 0, 
              position: 0, 
              florist: '',
              name: '',
              size: '',
              pattern: '',
              color: '',
              price: 0,
              occasion: '',
              quantityAvailable: '',
              deliveryFee: 0,
              totalPrice : 0   
              };
              resultRow.id = this.searchFlowerFormulaResult[i].id;
              resultRow.position = i;
              resultRow.florist= "ซงหนิงหนิง";
              resultRow.name = this.searchFlowerFormulaResult[i].name;
              resultRow.size = this.searchFlowerFormulaResult[i].size;
              resultRow.pattern = this.searchFlowerFormulaResult[i].pattern;
              resultRow.color = this.searchFlowerFormulaResult[i].color;
              resultRow.price = this.searchFlowerFormulaResult[i].price;
              resultRow.occasion = this.searchFlowerFormulaResult[i].occasion;
              resultRow.quantityAvailable = this.searchFlowerFormulaResult[i].quantityAvailable;
              resultRow.deliveryFee = this.searchFlowerFormulaResult[i].deliveryFee;
          //    resultRow.totalPrice = this.searchFlowerFormulaResult[i].totalPrice;
             resultRow.totalPrice =   this.searchFlowerFormulaResult[i].price + this.searchFlowerFormulaResult[i].deliveryFee;
              //find quantity availble for nink
             // this.restApiService.getFlowerAvailable(this.searchFlowerFormulaResult[i].id, 1).subscribe((result) => {
              resultRow.quantityAvailable = "3";
            //})
              this.searchFlowerFormulaFlorist.push(resultRow);
 
              }
        }
        this.price= [];
      }
 
      this.searchFlowerFormulaResult = this.searchFlowerFormulaResult.concat(this.searchFlowerFormulaFlorist);
    //  this.searchFlowerFormulaResult.sort((a,b)=> a.size.localeCompare(b.size)).sort((a, b) => b.price - a.price);
      for (let i = 0 ; i < this.searchFlowerFormulaResult.length ; i++)
      {
        this.searchFlowerFormulaResult[i].position = i+1;
      }
      this.dataSource = new MatTableDataSource<SearchFlowerFormulaResult>(this.searchFlowerFormulaResult); 

     // this.searchFlowerFomularResult = this.flowerFormulaSearch;
    
  //  this.dataSource = new MatTableDataSource<FlowerFormula>(this.flowerFormulas);

      console.warn(this.searchFlowerForm.value);
    })

    this.getDistancia("siam paragon","icon siam");
  }

  public getDistancia(origen: string, destino: string) {
    return new google.maps.DistanceMatrixService().getDistanceMatrix({'origins': [origen], 'destinations': [destino], travelMode: google.maps.TravelMode.DRIVING}, (results: any) => {
        console.log('resultados distancia (mts) -- ', results.rows[0].elements[0].distance.value)
    });
}

}



//export interface SearchFlowerFomularResult {

//}

