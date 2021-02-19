import { SelectionModel } from '@angular/cdk/collections';
import { Component, EventEmitter, Injectable, OnInit, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { takeUntil } from 'rxjs/operators';
import { SalesOrderElement } from '../interface/sales-order-element'
import { RestApiService } from '../_shared/rest-api.service';

@Component({
  selector: 'salesorder',
  templateUrl: './salesorder.component.html',
  styleUrls: ['./salesorder.component.css']
})

export class SalesorderComponent implements OnInit {

  ELEMENT_DATA: SalesOrderElement[] = [];
  numberOfOrder: number = 0;
  displayedColumns: string[] = [];
  dataSource: any;
  selection: any;

  constructor(
    private restApiService: RestApiService
  ) { }

  ngOnInit(): void {
    this.restApiService.getSalesOrder().subscribe((data: SalesOrderElement[]) => {
      for (let i = 0; i < data.length; i++) {
        this.ELEMENT_DATA.push(data[i]);
      }
      this.numberOfOrder = data.length;
      this.displayedColumns = ['id', 'status', 'deliveryDateTime', 'customerName', 'select'];
      this.dataSource = new MatTableDataSource<SalesOrderElement>(this.ELEMENT_DATA);
      this.selection = new SelectionModel<SalesOrderElement>(true, []);
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  printRow(row: SalesOrderElement, check: boolean): void {
    if (this.selection.isSelected(row) === false) {
      console.log(row);
    }
  }

}
