/// <reference types="@types/googlemaps" />
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FlowerFormula } from '../interface/flower-formula';
import { Florist } from '../interface/florist';
import { SearchFlowerFormulaResult } from '../interface/searchFlowerFormulaResult';
import { RestApiService } from '../_shared/rest-api.service';
import { FloristDeliveryFee } from '../interface/FloristDeliveryFee';
import { isNull } from '@angular/compiler/src/output/output_ast';
import { DecimalPipe,formatNumber } from '@angular/common';
import { ignoreElements } from 'rxjs/operators';
//import { isNull } from '@angular/compiler/src/output/output_ast';
@Component({
  selector: 'searchflower',
  templateUrl: './searchflower.component.html',
  styleUrls: ['./searchflower.component.css']
})

export class SearchflowerComponent implements OnInit {
  [x: string]: any;
  currentDate = new Date();

  flowerFormula: FlowerFormula[] = [];
  flowerFormulaSearch: FlowerFormula[] = [];
  displayedColumns: string[] = ['position', 'name', 'quantityAvailable', 'pattern', 'color', 'size', 'occasion', 'florist', 'price', 'deliveryFee', 'totalPrice'];
  searchFlowerFormulaResult: SearchFlowerFormulaResult[] = [];
  searchFlowerFormulaResultFilter: SearchFlowerFormulaResult[] = [];
  searchFlowerFormulaFlorist: SearchFlowerFormulaResult[] = [];
  deliveryFee: any = 0;
  dataSource = new MatTableDataSource<SearchFlowerFormulaResult>();
  flowerList: string[] = ['WhiteRose', 'Redrose', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];
  flowerFormulas: FlowerFormula[] = [];
  geocoder = new google.maps.Geocoder();
  florists: Florist[] = [];
  floristDeliveryFee : FloristDeliveryFee[] = [];
  customerLocation = new google.maps.LatLng(0,0);
  searchFlowerForm = new FormGroup({
    flowerCat: new FormControl(''),
    name: new FormControl(''),
    occasion: new FormControl(''),
    color: new FormControl(''),
    date: new FormControl(''),
    pattern: new FormControl(''),
    quantity: new FormControl(),
    priceFrom: new FormControl(''),
    priceTo: new FormControl(''),
    address: new FormControl(''),
    size: new FormControl(''),
    florist: new FormControl('')
  });

  constructor(private restApiService: RestApiService) { }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() : void {
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
          totalPrice: number
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
          totalPrice: 0
        };
        searchResult.id = i;
        searchResult.position = i;
        searchResult.florist = "ซงหนิง";
        searchResult.name = data[i].name;
        searchResult.size = data[i].size;
        searchResult.pattern = data[i].pattern;
        searchResult.color = data[i].color;
        searchResult.price = data[i].price;
        searchResult.occasion = data[i].occasion;
        searchResult.quantityAvailable = Number(data[i].quantityAvailable);
        searchResult.deliveryFee = 0;
        searchResult.totalPrice = data[i].price;

        if (data[i].pattern == 'เกาหลี') {
          searchResult.florist = 'ซงหนิงหนิง';
          //find quantity availbale for nink
          this.restApiService.getFlowerAvailableFromCurrentStock(data[i].id, 1, this.currentDate).subscribe((result) => {
            searchResult.quantityAvailable = result;
          })
        } else {
          searchResult.florist = 'หนึ่ง';
          //find quantity available for neung
          this.restApiService.getFlowerAvailableFromCurrentStock(data[i].id, 2, this.currentDate).subscribe((result) => {
            searchResult.quantityAvailable = result;
          });
          //Add new row for new florist
          let resultRow: {
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
            totalPrice: number
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
            totalPrice: 0
          };
          resultRow.id = data[i].id;
          resultRow.position = i;
          resultRow.florist = "ซงหนิงหนิง";
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
          this.restApiService.getFlowerAvailableFromCurrentStock(data[i].id, 1, this.currentDate).subscribe((result) => {
            resultRow.quantityAvailable = result;
          })
          this.searchFlowerFormulaFlorist.push(resultRow);
        }
        this.searchFlowerFormulaResult.push(searchResult);
      }
      this.searchFlowerFormulaResult = this.searchFlowerFormulaResult.concat(this.searchFlowerFormulaFlorist);
      this.searchFlowerFormulaResult.sort((a, b) => a.name.localeCompare(b.name));
      for (let i = 0; i < this.searchFlowerFormulaResult.length; i++) {
        this.searchFlowerFormulaResult[i].position = i + 1;
      }
    // this.calculateDistance('siam paragon');
      this.dataSource = new MatTableDataSource<SearchFlowerFormulaResult>(this.searchFlowerFormulaResult);
      this.dataSource.paginator = this.paginator;
    });
  }

  selectedValue: string | undefined;

  flowerCat = [
    { value: '1', viewValue: '' },
    { value: '2', viewValue: 'ดอกไม้สด' },
    { value: '3', viewValue: 'ดอกไม้แห้ง' }
  ];

  flower = [
    { value: '1', viewValue: 'กุหลาบขาว' },
    { value: '2', viewValue: 'กุหลาบแดง' },
    { value: '3', viewValue: 'กุหลาบชมพู' },
    { value: '4', viewValue: 'กุหลาบมาแชล' },
    { value: '5', viewValue: 'ทานตะวัน' },
    { value: '6', viewValue: 'ไฮเดนเยีย' }
  ];

  occasion = [
    { value: '1', viewValue: 'Congratulations' },
    { value: '2', viewValue: 'hospital' },
    { value: '3', viewValue: 'Birthday' },
    { value: '4', viewValue: 'Wedding' },
    { value: '4', viewValue: 'Valentine' }
  ];

  color = [
    { value: '1', viewValue: '' },
    { value: '2', viewValue: 'เหลือง' },
    { value: '2', viewValue: 'ขาว' },
    { value: '2', viewValue: 'ชมพู' },
    { value: '2', viewValue: 'แดง' },
  ];

  pattern = [
    { value: '1', viewValue: '' },
    { value: '2', viewValue: 'เกาหลี' },
    { value: '3', viewValue: 'ทั่วไป' }
  ];

  florist = [
    { value: '1', viewValue: '' },
    { value: '2', viewValue: 'ซงหนิงหนิง' },
    { value: '3', viewValue: 'หนึ่ง' }
  ];

  calculateDistance(address: string)
  {
    let d = 0;
    this.geocoder.geocode({ 'address' : address }, (cusAddress, status) => {
      if (status == "OK") {
        if(cusAddress != null)
       { this.customerLocation = cusAddress[0].geometry.location;
        let R = 6371; // Radius of the earth in km
        let floristLat = 13.7995293;
        let floristLng = 100.550872;
  
           let dLat = this.deg2rad(this.customerLocation.lat() - floristLat);  // deg2rad below
          let dLng = this.deg2rad(this.customerLocation.lng() - floristLng); 
           let a =
             Math.sin(dLat / 2) * Math.sin(dLat / 2) +
             Math.cos(this.deg2rad(floristLat)) * Math.cos(this.deg2rad(this.customerLocation.lat() )) *
            Math.sin(dLng / 2) * Math.sin(dLng / 2)
             ;
           let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
           let d = R * c; // Distance in km
           //use 'd' for distance
           console.log('distance: ', d);
           alert('distance: '+ d);
         //  this.floristDeliveryFee[i].distance = Math.round(d);         //floristDeliveryFeeResult.

      }
        }
        else
        {
            alert("Geocode was not successful for the following reason: " + status);
        }
            
            });
  //calculatedistance
       
   
      return d;
      }

  //        for (let i = 0; i < this.floristDeliveryFee.length; i++) {

  //        this.restApiService.calculateDeliveryFee(this.floristDeliveryFee[i].distance).subscribe((deliveryFeeResult) => {
            
  //          this.floristDeliveryFee[i].deliveryFee = Number(deliveryFeeResult);
  //          if(isNaN(this.floristDeliveryFee[i].deliveryFee))
  //         {
  //           this.floristDeliveryFee[i].deliveryFee = 0;
  //        }
  //        }) //End calculate fee
  // }
//}

//   calculateDistance(address: string, floristId: any) {

//     if (address!='')
//     {
//       this.floristDeliveryFee = [];
//         //find customer location latlang 
//         this.geocoder.geocode({ 'address' : address }, (cusAddress, status) => {
//           if(cusAddress != null)
//          { this.customerLocation = cusAddress[0].geometry.location;}
//         });
//         //find all florist
//         this.restApiService.getFlorist().subscribe((data: Florist[]) => {
//           for (let i = 0; i < data.length; i++) {
        
//             let floristDeliveryFeeResult: {
//               id: number,
//               floristId: number,
//               name: string,
//               address: string,
//               location: google.maps.LatLng,
//               distance : number,
//               deliveryFee: number,
//             } = 
//             {
//               id: 0,
//               floristId: 0,
//               name: '',
//               address: '',
//               location: new google.maps.LatLng(0, 0),
//               distance: 0,
//               deliveryFee: 0,
//             };
//             floristDeliveryFeeResult.floristId = data[i].id;
//             floristDeliveryFeeResult.address = data[i].address;
//             floristDeliveryFeeResult.name = data[i].name;
//             this.floristDeliveryFee.push(floristDeliveryFeeResult); 
//           }//End for all florists
//         });//Enf get all florist

//         //find florist location
//         for (let j=0 ;j < this.floristDeliveryFee.length ; j++)
//         {
//         this.geocoder.geocode({ 'address' : this.floristDeliveryFee[j].address }, (results, status) => {
//           if(results != null)
//           {
//             this.floristDeliveryFee[j].location = results[0].geometry.location;
//           }
//         });//End find florist location 
//         }
//         //calculatedistance
//         for (let i=0 ;i < this.floristDeliveryFee.length ; i++)
//         {
//         let R = 6371; // Radius of the earth in km
//         let dLat = this.deg2rad(this.customerLocation.lat() - this.floristDeliveryFee[i].location.lat());  // deg2rad below
//         let dLng = this.deg2rad(this.customerLocation.lng() - this.floristDeliveryFee[i].location.lng()); 
//         let a =
//           Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//           Math.cos(this.deg2rad(this.floristDeliveryFee[i].location.lat())) * Math.cos(this.deg2rad(this.customerLocation.lat() )) *
//           Math.sin(dLng / 2) * Math.sin(dLng / 2)
//           ;
//         let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//         let d = R * c; // Distance in km
//         //use 'd' for distance
//         console.log('distance: ', d);
//         this.floristDeliveryFee[i].distance = Math.round(d);
//         //floristDeliveryFeeResult.
//       }

//         for (let i = 0; i < this.floristDeliveryFee.length; i++) {

//         this.restApiService.calculateDeliveryFee(this.floristDeliveryFee[i].distance).subscribe((deliveryFeeResult) => {
            
//           this.floristDeliveryFee[i].deliveryFee = Number(deliveryFeeResult);
//           if(isNaN(this.floristDeliveryFee[i].deliveryFee))
//           {
//             this.floristDeliveryFee[i].deliveryFee = 0;
//           }
//         }) //End calculate fee
//       }//end for this.floristDeliveryFee 
// }//end address != null
  
// return this.floristDeliveryFee;
// }

  deg2rad(deg: number) {
    return deg * (Math.PI / 180)
  }

  searchForm() {
    this.searchFlowerFormulaResult = [];
    this.searchFlowerFormulaFlorist = [];
    this.distance = 0;
    this.deliveryFee = 0;
   // this.calculateDistance(this.searchFlowerForm.value.address);
   this.restApiService.getFlorist().subscribe((data: Florist[]) => {
    this.florists = data;
    this.floristDeliveryFee = [];
   // searchResult.florist = String(data.find(f => this.f.id == this.searchFlowerForm.value.floristId)?.name);
  });

    this.restApiService.searchFlowerFormula(this.searchFlowerForm.value).subscribe((data: FlowerFormula[]) => {
      console.log(this.searchFlowerForm.value);
     
      this.flowerFormulaSearch = [];
      if (data != null) {
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
            totalPrice: number
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
            totalPrice: 0
          };
          searchResult.id = data[i].id;
          searchResult.position = i;
          if(isNaN(this.searchFlowerForm.value.floristId))
          {
            searchResult.florist = "";
          }
          else
          {
            searchResult.florist = String(this.florists.find(f => this.f.id == this.searchFlowerForm.value.floristId)?.name);
          }

    
          searchResult.name = data[i].name;
          searchResult.size = data[i].size;
          searchResult.pattern = data[i].pattern;
          searchResult.color = data[i].color;
          searchResult.price = data[i].price;
          searchResult.occasion = data[i].occasion;
          searchResult.quantityAvailable = 0;
          searchResult.deliveryFee = 0;
          searchResult.totalPrice = 0;

          this.searchFlowerFormulaResult.push(searchResult);
        }
      }

      // find available quantity
      for (let i = 0; i < this.searchFlowerFormulaResult.length; i++) {
        let price: Array<number> = [];
        let recieveDate: Date;
        recieveDate = this.currentDate;
        if (this.searchFlowerForm.value.date != '') {
          recieveDate = this.searchFlowerForm.value.date;
        }
        //totalPrice = 0;
     //   price.push(Number(this.searchFlowerFormulaResult[i].price));
        //if (price.length > 0) {
           // check if florist==null
            if(this.searchFlowerFormulaResult[i].florist == "")
            {
          if (this.searchFlowerFormulaResult[i].pattern == 'เกาหลี') {
            this.searchFlowerFormulaResult[i].florist = 'ซงหนิงหนิง';
            //find quantity availbale for Nink           
         //  this.searchFlowerFormulaResult[i].deliveryFee = Number(this.floristDeliveryFee.find(f => f.name === 'ซงหนิงหนิง')?.deliveryFee);

          } else {//แบบทั่วไป{
            this.searchFlowerFormulaResult[i].florist = 'หนึ่ง';
            //find quantity available for neung
            this.restApiService.getFlowerAvailableFromCurrentStock(data[i].id, 2, recieveDate).subscribe((result) => {
              this.searchFlowerFormulaResult[i].quantityAvailable = result;
            })
      
            // this.restApiService.calculateTotalPrice(this.searchFlowerFormulaResult[i].deliveryFee , price).subscribe((totalPrice) => {
            //   this.searchFlowerFormulaResult[i].position = i + 1;
            //  // this.searchFlowerFormulaResult[i].deliveryFee = this.deliveryFee;
            //   this.searchFlowerFormulaResult[i].totalPrice = Number(totalPrice);
            // })
            //Add new row for show other florist
            let resultRow: {
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
              totalPrice: number
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
              totalPrice: 0
            };
            resultRow.id = this.searchFlowerFormulaResult[i].id;
            resultRow.position = i;
            resultRow.florist = "ซงหนิงหนิง";
            resultRow.name = this.searchFlowerFormulaResult[i].name;
            resultRow.size = this.searchFlowerFormulaResult[i].size;
            resultRow.pattern = this.searchFlowerFormulaResult[i].pattern;
            resultRow.color = this.searchFlowerFormulaResult[i].color;
            resultRow.price = this.searchFlowerFormulaResult[i].price;
            resultRow.occasion = this.searchFlowerFormulaResult[i].occasion;
            resultRow.quantityAvailable = this.searchFlowerFormulaResult[i].quantityAvailable;


        //     if(this.floristDeliveryFee.length != 0)
        //     {
        //      resultRow.deliveryFee =  Number(this.floristDeliveryFee.find(f=> f.name === 'ซงหนิงหนิง')?.deliveryFee);
        //  //   })
        //     this.restApiService.calculateTotalPrice(resultRow.deliveryFee , price).subscribe((totalPrice) => {
        //       //this.searchFlowerFormulaResult[i].totalPrice = Number(totalPrice);
        //       resultRow.totalPrice = Number(totalPrice);
        //       // this.price= [];
        //     })
        //   }

            //find quantity availble for nink
            this.restApiService.getFlowerAvailableFromCurrentStock(data[i].id, 1, recieveDate).subscribe((result) => {
              resultRow.quantityAvailable = result;
            })

            this.searchFlowerFormulaFlorist.push(resultRow);

          }
        }//end if florist from screen == null
        else //find florist from screen
        {
            //find available quantity for florist 
          this.restApiService.getFlowerAvailableFromCurrentStock(data[i].id, 1, recieveDate).subscribe((result) => {
            this.searchFlowerFormulaResult[i].quantityAvailable = result;
          })
          //find delivery Fee
          //find total price
        }
        //}//End If price.lenght > 0
       // this.price = [];
      } // Enf for this.searchFlowerFormulaResult.length

      //Merge result from all florist
      this.searchFlowerFormulaResult = this.searchFlowerFormulaResult.concat(this.searchFlowerFormulaFlorist);
      //this.searchFlowerFormulaResult.sort((a,b)=> a.size.localeCompare(b.size)).sort((a, b) => b.price - a.price);
  
   
   if (this.searchFlowerForm.value.address != '')
      {
       // for(let i = 0; i < this.florists.length; i++)
       // {
        this.distance = this.restApiService.calculateDistanceFromFloristAddress(this.searchFlowerForm.value.address, this.florists[0].address);
        
             alert('distance customer = ' + this.distance);
             if(this.distance > 0)
             {
             let floristDeliveryFeeResult: {
              id: number,
              floristId: number,
              name: string,
              address: string,
              location: google.maps.LatLng,
              distance : number,
              deliveryFee: number,
            } = 
            {
              id: 0,
              floristId: 0,
              name: '',
              address: '',
              location: new google.maps.LatLng(0, 0),
              distance: 0,
              deliveryFee: 0,
            };
            floristDeliveryFeeResult.floristId = this.florists[0].id;
            floristDeliveryFeeResult.address = this.florists[0].address;
            floristDeliveryFeeResult.name = this.florists[0].name;
            floristDeliveryFeeResult.distance = this.distance;
            this.floristDeliveryFee.push(floristDeliveryFeeResult);   
          }
          //}           
 }

//calculate delivery fee
if(this.floristDeliveryFee.length > 0)
{
  //TO DO for floristDeliveryFee
 this.restApiService.calculateDeliveryFee(this.floristDeliveryFee[0].distance).subscribe((deliveryFeeResult) => {
   this.deliveryFee = Number(deliveryFeeResult);
   console.log('deliveryFee: ', deliveryFeeResult);
   this.floristDeliveryFee[0].deliveryFee = this.deliveryFee ;
  
 });
   
}
      //calculate price for all result
   for (let i = 0; i < this.searchFlowerFormulaResult.length; i++) {


    this.deliveryFee =  Number(this.floristDeliveryFee.find(f => f.name ===  this.searchFlowerFormulaResult[i].florist)?.deliveryFee);
                this.searchFlowerFormulaResult[i].position = i + 1;
                this.searchFlowerFormulaResult[i].deliveryFee =  this.deliveryFee;
                this.searchFlowerFormulaResult[i].totalPrice = this.searchFlowerFormulaResult[i].price +  this.deliveryFee;
   }

      this.dataSource = new MatTableDataSource<SearchFlowerFormulaResult>(this.searchFlowerFormulaResult);
      if (this.searchFlowerForm.value.quantity != null && this.searchFlowerForm.value.quantity != '') {
        this.searchFlowerFormulaResultFilter = this.searchFlowerFormulaResult.filter(result => result.quantityAvailable >= this.searchFlowerForm.value.quantity);
        //this.dataSource =this.searchFlowerFormulaResult; 
        this.dataSource = new MatTableDataSource<SearchFlowerFormulaResult>(this.searchFlowerFormulaResultFilter);
        //for
        //this.searchFlowerFormulaResult = [];
        this.dataSource.filteredData = new MatTableDataSource<SearchFlowerFormulaResult>(this.searchFlowerFormulaResultFilter).filteredData;

      }
      this.dataSource.paginator = this.paginator;

      // this.searchFlowerFomularResult = this.flowerFormulaSearch;

      //  this.dataSource = new MatTableDataSource<FlowerFormula>(this.flowerFormulas);

      console.warn(this.searchFlowerForm.value);
      console.warn(this.dataSource);
      console.warn(this.searchFlowerFormulaResultFilter);
    })
  }
}