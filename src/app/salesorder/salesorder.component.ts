import { SelectionModel } from '@angular/cdk/collections';
import { Component, ElementRef, EventEmitter, Injectable, OnInit, Output, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SalesOrderElement } from '../interface/sales-order-element'
import { RestApiService } from '../_shared/rest-api.service';
import { SalesOrderDetail } from '../interface/sales-order-detail'
import { SalesorderService } from './salesorder.service';

@Component({
  selector: 'salesorder',
  templateUrl: './salesorder.component.html',
  styleUrls: ['./salesorder.component.css']
})

export class SalesorderComponent implements OnInit {

  salesOrders: SalesOrderElement[] = [];
  numberOfOrder: number = 0;
  displayedColumns: string[] = [];
  dataSource: any;

  constructor(
    private restApiService: RestApiService,
    private service: SalesorderService
  ) { }

  ngOnInit(): void {
    this.restApiService.getSalesOrder().subscribe((data: SalesOrderElement[]) => {
      for (let i = 0; i < data.length; i++) {
        this.salesOrders.push(data[i]);
      }
      this.numberOfOrder = data.length;
      this.displayedColumns = ['id', 'status', 'deliveryDateTime', 'customerName', 'select'];
      this.dataSource = new MatTableDataSource<SalesOrderElement>(this.salesOrders);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onEdit(row: SalesOrderElement): void {
    this.restApiService.getSalesOrderDetail(row.id).subscribe((data: SalesOrderDetail) => {
      row.flowerAvailable = data.quantity;
      row.florist = data.florist.id;
      row.flowerFormular = data.flowerFormula.id;
    })
    this.service.updateSalesOrder(row);
    // console.log(row);
  }

}
