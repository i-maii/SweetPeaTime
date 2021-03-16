/// <reference types="@types/googlemaps" />
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FlowerFormula } from '../interface/flower-formula';
import { SearchFlowerFormulaResult } from '../interface/searchFlowerFormulaResult';
import { RestApiService } from '../_shared/rest-api.service';

@Component({
  selector: 'searchflower',
  templateUrl: './searchflower.component.html',
  styleUrls: ['./searchflower.component.css']
})

export class SearchflowerComponent implements AfterViewInit {
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

  ngAfterViewInit() {
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

  calculateDistance(address: string) {
    this.geocoder.geocode({ 'address': address }, (results, status) => {
      const lat1 = 13.722573;
      const lng1 = 100.580231;
      const lat2 = results[0].geometry.location.lat();
      const lng2 = results[0].geometry.location.lng();

      let R = 6371; // Radius of the earth in km
      let dLat = this.deg2rad(lat2 - lat1);  // deg2rad below
      let dLng = this.deg2rad(lng2 - lng1);
      let a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
        Math.sin(dLng / 2) * Math.sin(dLng / 2)
        ;
      let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      let d = R * c; // Distance in km
      //use 'd' for distance
      console.log('distance: ', d);
    });
  }

  deg2rad(deg: number) {
    return deg * (Math.PI / 180)
  }

  searchForm() {
    this.searchFlowerFormulaResult = [];
    this.searchFlowerFormulaFlorist = [];
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
          searchResult.florist = "ซงหนิง";
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
      }
      // let totalPrice = 0;
      for (let i = 0; i < this.searchFlowerFormulaResult.length; i++) {
        let price: Array<number> = [];
        let recieveDate: Date;
        recieveDate = this.currentDate;
        if (this.searchFlowerForm.value.date != '') {
          recieveDate = this.searchFlowerForm.value.date;
        }
        //totalPrice = 0;
        price.push(Number(this.searchFlowerFormulaResult[i].price));
        if (price.length > 0) {

          if (this.searchFlowerFormulaResult[i].pattern == 'เกาหลี') {
            this.searchFlowerFormulaResult[i].florist = 'ซงหนิงหนิง';
            //find quantity availbale

            this.restApiService.getFlowerAvailableFromCurrentStock(data[i].id, 1, recieveDate).subscribe((result) => {
              this.searchFlowerFormulaResult[i].quantityAvailable = result;
            })

            var deliveryFeeResult;
            this.restApiService.calculateDeliveryFee("area").subscribe((deliveryFeeResult) => {
              // this.deliveryFee = deliveryFeeResult;

            })
            this.deliveryFee = 150;
            this.restApiService.calculateTotalPrice(150, price).subscribe((totalPrice) => {
              //this.searchFlowerFormulaResult[i].totalPrice = Number(totalPrice);
              this.searchFlowerFormulaResult[i].position = i + 1;
              //this.searchFlowerFormulaResult[i].deliveryFee = this.deliveryFee;
              this.searchFlowerFormulaResult[i].deliveryFee = 150;
              this.searchFlowerFormulaResult[i].totalPrice = Number(totalPrice);
            })
            //this.searchFlowerFormulaResult[i].totalPrice = this.searchFlowerFormulaResult[i].price + this.deliveryFee;

          } else {//แบบทั่วไป{
            this.searchFlowerFormulaResult[i].florist = 'หนึ่ง';
            //find quantity available for neung
            this.restApiService.getFlowerAvailableFromCurrentStock(data[i].id, 2, recieveDate).subscribe((result) => {
              this.searchFlowerFormulaResult[i].quantityAvailable = result;
            })

            //Calculate delivery fee total price for florist neung 
            var deliveryFeeResult;
            this.restApiService.calculateDeliveryFee("area").subscribe((deliveryFeeResult) => {
              // this.deliveryFee = deliveryFeeResult;
              this.deliveryFee = 200;
            })
            this.restApiService.calculateTotalPrice(200, price).subscribe((totalPrice) => {
              this.searchFlowerFormulaResult[i].position = i + 1;
              this.searchFlowerFormulaResult[i].deliveryFee = this.deliveryFee;
              this.searchFlowerFormulaResult[i].totalPrice = Number(totalPrice);
            })


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


            var deliveryFeeResult;
            this.restApiService.calculateDeliveryFee("area").subscribe((deliveryFeeResult) => {
              // this.deliveryFee = deliveryFeeResult;
              this.deliveryFee = 150;
              resultRow.deliveryFee = this.deliveryFee;
            })

            this.restApiService.calculateTotalPrice(150, price).subscribe((totalPrice) => {
              //this.searchFlowerFormulaResult[i].totalPrice = Number(totalPrice);
              resultRow.totalPrice = Number(totalPrice);
              // this.price= [];
            })

            //find quantity availble for nink
            this.restApiService.getFlowerAvailableFromCurrentStock(data[i].id, 1, recieveDate).subscribe((result) => {
              resultRow.quantityAvailable = result;
            })

            this.searchFlowerFormulaFlorist.push(resultRow);

          }
        }//End If price.lenght > 0
        this.price = [];
      } // Enf for this.searchFlowerFormulaResult.length

      //Merge result from all florist
      this.searchFlowerFormulaResult = this.searchFlowerFormulaResult.concat(this.searchFlowerFormulaFlorist);
      //this.searchFlowerFormulaResult.sort((a,b)=> a.size.localeCompare(b.size)).sort((a, b) => b.price - a.price);
      for (let i = 0; i < this.searchFlowerFormulaResult.length; i++) {
        this.searchFlowerFormulaResult[i].position = i + 1;
      }

      this.dataSource = new MatTableDataSource<SearchFlowerFormulaResult>(this.searchFlowerFormulaResult);
      if (this.searchFlowerForm.value.quantity != null && this.searchFlowerForm.value.quantity != '') {
        this.searchFlowerFormulaResultFilter = this.searchFlowerFormulaResult.filter(result => result.quantityAvailable >= this.searchFlowerForm.value.quantity);
        //this.dataSource =this.searchFlowerFormulaResult; 
        this.dataSource = new MatTableDataSource<SearchFlowerFormulaResult>(this.searchFlowerFormulaResultFilter);
        //for
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