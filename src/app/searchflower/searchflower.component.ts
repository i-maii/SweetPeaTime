/* eslint-disable no-undef */

//import { Component } from '@angular/core';
//import { Component, OnInit } from '@angular/core';
// <reference types="@types/googlemaps" />
//<reference types="googlemaps" />
// <reference types="googlemaps" />
//// <reference types="@types/googlemaps/" />

//<reference path="/Users/mac/SweetPeaTime/node_modules/@types/googlemaps/index.d.ts"/>
import {AfterViewInit, Component, ViewChild} from '@angular/core';
import { FormControl, FormGroup, FormControlName } from '@angular/forms';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { FlowerFormula } from '../interface/flower-formula';
import { SearchFlowerFormulaResult } from '../interface/searchFlowerFormulaResult';
import { FlowerFomular } from '../_models/flower-fomular';
import { RestApiService } from '../_shared/rest-api.service';
//import {google} from '@types/googlemaps';
//import { googlemaps } from '@types/googlemaps/reference/distance-matrix.d.ts';
//import { google } from '@types/googlemaps';
//import {google} from 'googlemaps';
//import { AgmCoreModule, MapsAPILoader } from "@agm/core";
//import { GoogleMapsModule } from '@angular/google-maps';
//import { GoogleMapsModule } from '@angular/google-maps';
//import { MapInfoWindow, MapMarker, GoogleMap } from '@angular/google-maps';
import { identifierModuleUrl } from '@angular/compiler';
//declare var google: GoogleMap;
//declare const google: GoogleMap;

//declare var google: { maps: { LatLng: new (arg0: number, arg1: number) => any; geometry: { spherical: { computeDistanceBetween: (arg0: any, arg1: any) => any; }; }; }; };
//var google2 : GoogleMapsModule;
//declare var google: google;
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
  currentDate = new Date();

  flowerFormula: FlowerFormula[] = [];
  flowerFormulaSearch: FlowerFormula[] = [];
  displayedColumns: string[] = ['position','name','quantityAvailable','pattern','color','size','occasion','florist','price','deliveryFee', 'totalPrice'];
  searchFlowerFormulaResult: SearchFlowerFormulaResult[] = [];
  //searchFlowerFormulaResultFilter: SearchFlowerFormulaResult[] = [];
  searchFlowerFormulaResultFilter: SearchFlowerFormulaResult[] = [];
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
  
  //productLat;                                                          
  //productLong;                                                          
  //userLat;                                                               
  //userLong;
  //productLat;                                                          
  //productLong;                                                          
  //userLat;                                                               
  //userLong;
  //map!: google.maps.Map;
  //listingPlace;                                                    
  //distanceProductToUser;
  
  constructor(private restApiService: RestApiService) { }  

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
   // this.getData(this.flowerfomular)\

   
   this.productLat = 40.785091; // change it to your preferences                                           
   this.productLong = 73.968285; // <-- static                                                                                     
// const coordinates = new google.mapM(this.productLat, this.productLong); // init our coordinate for marker :)
// this.marker = new google.set.Marker({ 
//   position: 11,
//   map: this.map 
//  })

// navigator.geolocation.getCurrentPosition((position) => {           
//   this.userLat = position.coords.latitude;                              
//    this.userLong = position.coords.longitude; 
//    alert("Google Maps in your Browser"+ this.userLong);                  
//    console.log('resultados distancia (mts) -- ', this.userLong)
//    // this.calculateDistanceUserToProduct();                                  
//   }, error => {                   
                                        
//  alert("Please Allow Google Maps in your Browser"+ this.userLong);                  
//                })
 
 //const mexicoCity = new google.maps.LatLng(19.432608, -99.133209);
 // const jacksonville = new google.maps.LatLng(40.730610, -73.935242);
 // const distance = google.maps.geometry.spherical.computeDistanceBetween(mexicoCity, jacksonville);
  //  console.log('resultados distancia (mts) -- ', distance);
 //  this.getDistancia("siam paragon","icon siam");
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
          quantityAvailable: number,
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
         quantityAvailable: 0,
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
         searchResult.quantityAvailable = Number(data[i].quantityAvailable);
         searchResult.deliveryFee = 0;
         searchResult.totalPrice = data[i].price;
  
         

         if (data[i].pattern == 'เกาหลี')
              {
                searchResult.florist =  'ซงหนิงหนิง';
                  //find quantity availbale for nink
                  this.restApiService.getFlowerAvailableFromCurrentStock(data[i].id, 1,this.currentDate).subscribe((result) => {
                  searchResult.quantityAvailable = result;})
              }
              else
              {
                searchResult.florist = 'หนึ่ง';
              //find quantity available for neung
              this.restApiService.getFlowerAvailableFromCurrentStock(data[i].id, 2,this.currentDate).subscribe((result) => {
                searchResult.quantityAvailable = result;})
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
                quantityAvailable: number,
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
              quantityAvailable: 0,
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
              resultRow.quantityAvailable = Number(data[i].quantityAvailable);
              resultRow.deliveryFee = 0;
              resultRow.totalPrice = data[i].price;
              
              //find quantity available for nink
              this.restApiService.getFlowerAvailableFromCurrentStock(data[i].id, 1,this.currentDate).subscribe((result) => {
              resultRow.quantityAvailable = result;})
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
     // console.log(this.searchFlowerForm.value);
     // this.flowerFormulaSearch = [];
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
          quantityAvailable: number,
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
        quantityAvailable: 0,
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
        searchResult.quantityAvailable = Number(data[i].quantityAvailable);
        searchResult.deliveryFee = 150;
        searchResult.totalPrice = 0;

        this.searchFlowerFormulaResult.push(searchResult);
      //   this.searchFlowerFomularResult.push((i.toString(),data[i].name, data[i].name, data[i].occasion, data[i].pattern, data[i].price, data[i].quantityAvailable, data[i].size);
      }
    
  
    
  
   // let totalPrice = 0;
      for (let i = 0; i < this.searchFlowerFormulaResult.length; i++) {
        let price: Array<number> = [];
        let recieveDate: Date; 
          recieveDate = this.currentDate;
          if(this.searchFlowerForm.value.date != '')
          {
            recieveDate = this.searchFlowerForm.value.date;
          } 
        //totalPrice = 0;
        price.push(Number(this.searchFlowerFormulaResult[i].price));
        if (price.length > 0)
        {
             
              if (this.searchFlowerFormulaResult[i].pattern == 'เกาหลี')
              {
                this.searchFlowerFormulaResult[i].florist =  'ซงหนิงหนิง';
                  //find quantity availbale
                
                this.restApiService.getFlowerAvailableFromCurrentStock(data[i].id, 1,recieveDate).subscribe((result) => {
                this.searchFlowerFormulaResult[i].quantityAvailable = result;})

                var deliveryFeeResult;
                this.restApiService.calculateDeliveryFee("area").subscribe((deliveryFeeResult) => {
               // this.deliveryFee = deliveryFeeResult;
              
              })
              this.deliveryFee = 150;
                this.restApiService.calculateTotalPrice(150, price).subscribe((totalPrice) => {
                  //this.searchFlowerFormulaResult[i].totalPrice = Number(totalPrice);
                this.searchFlowerFormulaResult[i].position = i+1;
                //this.searchFlowerFormulaResult[i].deliveryFee = this.deliveryFee;
                this.searchFlowerFormulaResult[i].deliveryFee = 150;
                this.searchFlowerFormulaResult[i].totalPrice = Number(totalPrice);
                          })
                  //this.searchFlowerFormulaResult[i].totalPrice = this.searchFlowerFormulaResult[i].price + this.deliveryFee;
                 
              }
              else //แบบทั่วไป
              {
              this.searchFlowerFormulaResult[i].florist = 'หนึ่ง';
               //find quantity available for neung
              this.restApiService.getFlowerAvailableFromCurrentStock(data[i].id, 2,recieveDate).subscribe((result) => {
                this.searchFlowerFormulaResult[i].quantityAvailable = result;})
                
               //Calculate delivery fee total price for florist neung 
                var deliveryFeeResult;
                this.restApiService.calculateDeliveryFee("area").subscribe((deliveryFeeResult) => {
               // this.deliveryFee = deliveryFeeResult;
               this.deliveryFee = 200;
              })
                this.restApiService.calculateTotalPrice(200, price).subscribe((totalPrice) => {
                this.searchFlowerFormulaResult[i].position = i+1;
                this.searchFlowerFormulaResult[i].deliveryFee = this.deliveryFee;
                this.searchFlowerFormulaResult[i].totalPrice = Number(totalPrice);
                          })
              
              
                //Add new row for show other florist
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
                quantityAvailable: number,
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
              quantityAvailable: 0,
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


              var deliveryFeeResult;
              this.restApiService.calculateDeliveryFee("area").subscribe((deliveryFeeResult) => {
             // this.deliveryFee = deliveryFeeResult;
             this.deliveryFee = 150;
              resultRow.deliveryFee = this.deliveryFee ;})

              this.restApiService.calculateTotalPrice(150, price).subscribe((totalPrice) => {
                //this.searchFlowerFormulaResult[i].totalPrice = Number(totalPrice);
                resultRow.totalPrice = Number(totalPrice);
               // this.price= [];
                        })

             //find quantity availble for nink
              this.restApiService.getFlowerAvailableFromCurrentStock(data[i].id, 1,recieveDate).subscribe((result) => {
                resultRow.quantityAvailable  = result;})
              this.searchFlowerFormulaFlorist.push(resultRow);
 
              }
        }//End If price.lenght > 0
        this.price= [];
      } // Enf for this.searchFlowerFormulaResult.length
 
      //Merge result from all florist
      this.searchFlowerFormulaResult = this.searchFlowerFormulaResult.concat(this.searchFlowerFormulaFlorist);
    //  this.searchFlowerFormulaResult.sort((a,b)=> a.size.localeCompare(b.size)).sort((a, b) => b.price - a.price);
   
  

     }//end data !=null
   

      
      if(this.searchFlowerForm.value.quantity != null && this.searchFlowerForm.value.quantity != '')
      {

        
        this.searchFlowerFormulaResultFilter = this.searchFlowerFormulaResult.filter(result => result.quantityAvailable >= Number(this.searchFlowerForm.value.quantity));
      // this.dataSource =this.searchFlowerFormulaResult; 
        //for
        //this.searchFlowerFormulaResult = [];
        this.dataSource.filteredData = new MatTableDataSource<SearchFlowerFormulaResult>(this.searchFlowerFormulaResultFilter).filteredData;

      }
      else
      {
        for (let i = 0 ; i < this.searchFlowerFormulaResult.length ; i++)
        {
          this.searchFlowerFormulaResult[i].position = i+1;
        }
        this.dataSource = new MatTableDataSource<SearchFlowerFormulaResult>(this.searchFlowerFormulaResult);

      }
    
      console.warn(this.searchFlowerForm.value);
      console.warn(this.dataSource );
      console.warn(this.searchFlowerFormulaResultFilter );
    })//end rest API search
  //  this.getDistancia("siam paragon","icon siam");
  }

//   public getDistancia(origen: string, destino: string) {
//     return new google.maps.DistanceMatrixService().getDistanceMatrix({'origins': [origen], 'destinations': [destino], travelMode: google.maps.TravelMode.DRIVING}, (results: any) => {
//         console.log('resultados distancia (mts) -- ', results.rows[0].elements[0].distance.value)
//     });
// }

}



//export interface SearchFlowerFomularResult {

//}

