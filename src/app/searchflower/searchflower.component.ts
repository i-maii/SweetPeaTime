//import { Component } from '@angular/core';
//import { Component, OnInit } from '@angular/core';
import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

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
  
  displayedColumns: string[] = ['position', 'Fomular', 'Quantity','Florist', 'Price'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
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