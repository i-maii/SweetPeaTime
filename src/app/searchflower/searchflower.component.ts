//import { Component } from '@angular/core';
//import { Component, OnInit } from '@angular/core';
import { ThrowStmt } from '@angular/compiler';
import {AfterViewInit, Component, ViewChild} from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { FlowerFomular } from '../_models/flower-fomular';
import { FlowerFomularService } from '../_services/flower-fomular.service';
import { FormBuilder, Validators } from '@angular/forms';

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
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  /*flower = new FormControl();
  flowerList: string[] = ['', 'กุหลาบแดง', 'ทานตะวัน', 'ลิลลี่ขาว', 'ไฮเดรนเยียคราม', 'ไฮเดรนเยียชมพู'];
*/
  flower = new FormControl();
  flowerList: string[] = ['WhiteRose', 'Redrose', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];
  flowerfomular = new FlowerFomular ();  
  private data: any;  

  SearchFlowerForm = new FormGroup({  
    flowerCat: new FormControl(),
    flower: new FormControl(), 
    occasion: new FormControl(), 
    color: new FormControl(), 
    date: new FormControl(), 
    florist : new FormControl(), 
    quantity : new FormControl(),
    priceFrom : new FormControl(), 
    priceTo: new FormControl(), 
    address  : new FormControl(), 
  });
  
  constructor(private flowerfomularService : FlowerFomularService) { }  

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
   // this.getData(this.flowerfomular)
    this.dataSource.paginator = this.paginator;
  }


  
  getData(flowerfomular: FlowerFomular)  
  {  
      this.flowerfomularService.getData(flowerfomular).subscribe(  
        (        response: { json: () => any; }) => {  
          this.data = response.json();  
        },  
        (        error: any) => {  
          console.log("error while getting user Details");  
        }  
      );  
  }
  
  searchForm(searchInfo : any)  
  {  
    searchInfo.flower = 'Whiterose';
    searchInfo.quantity= 2;
      //  this.flowerfomular.name = this.Name.value;  
       // this.flowerfomular.quantity= this.Quantity.value; 
       this.flowerfomular.name = 'Whiterose' ;  
       this.flowerfomular.quantity= 2;   
        this.getData(this.flowerfomular);  
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

export interface PeriodicElement {
  position: number;
  Fomular: string;
  Quantity: number;
  Florist: string;
  Price: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, Fomular: 'Hydrogen',Quantity: 1, Price: 1.0079,  Florist: 'H'},
  {position: 2, Fomular: 'Helium', Quantity: 1,Price: 1.0079,   Florist: 'He'},
  {position: 3, Fomular: 'Lithium',Quantity: 1,Price: 1.0079,  Florist: 'Li'},
  {position: 4, Fomular: 'Beryllium',Quantity: 1, Price: 9.0122, Florist: 'Be'},
  {position: 5, Fomular: 'Boron',Quantity: 1, Price: 10.811, Florist: 'B'},
  {position: 6, Fomular: 'Carbon',Quantity: 1, Price: 12.0107, Florist: 'C'},
  {position: 7, Fomular: 'Nitrogen',Quantity: 1,Price: 14.0067,  Florist: 'N'},
  {position: 8,Fomular: 'Oxygen', Quantity: 1,Price: 15.9994, Florist: 'O'},
  {position: 9, Fomular: 'Fluorine', Quantity: 1,Price: 18.9984,  Florist: 'F'},
  {position: 10, Fomular: 'Neon', Quantity: 1,Price: 20.1797,  Florist: 'Ne'},
  {position: 11, Fomular: 'Sodium', Quantity: 1,Price: 22.9897, Florist: 'Na'},
  {position: 12, Fomular: 'Magnesium',Quantity: 1,Price: 24.305, Florist: 'Mg'},
  {position: 13, Fomular: 'Aluminum', Quantity: 1,Price: 26.9815,  Florist: 'Al'},
  {position: 14,Fomular: 'Silicon', Quantity: 1,Price: 28.0855,  Florist: 'Si'},
  {position: 15, Fomular: 'Phosphorus',Quantity: 1,Price: 35.453, Florist: 'Cl'},
  {position: 18, Fomular: 'Argon', Quantity: 1,Price: 39.948,  Florist: 'Ar'},
  {position: 19, Fomular: 'Potassium',Quantity: 1,Price: 39.0983, Florist: 'K'},
  {position: 20, Fomular: 'Calcium',Quantity: 1, Price: 40.078,  Florist: 'Ca'},
];