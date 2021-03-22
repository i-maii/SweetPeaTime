import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { RestApiService } from '../_shared/rest-api.service';
import { SalesOrderDetail } from '../interface/sales-order-detail'
import { MatDialog } from '@angular/material/dialog';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { SalesOrderElement } from '../interface/sales-order-element';
import { SalesOrderDetailListDto } from '../interface/sales-order-detail-list-dto';

@Component({
    selector: 'report',
    templateUrl: './saleReport.component.html',
    styleUrls: ['./saleReport.component.css']
  })
  
  export class SaleReportComponent implements OnInit {
   
  salesOrders: SalesOrderDetailListDto[] = [];
  numberOfOrder: number = 0;
  displayedColumns: string[] = [];
  dataSource: any;
  searchFilter = new FormControl();
  flowerMultipleForms = new FormArray([new FormGroup({
    flowerFormula: new FormControl(),
    orderTotal: new FormControl(),
  })
  ]);

  constructor(
    private restApiService: RestApiService,
    public dialog: MatDialog,
  ) { }


    ngOnInit(): void {
        this.restApiService.getListSalesOrder().subscribe((data: SalesOrderDetailListDto[]) => {
          for (let i = 0; i < data.length; i++) {
            this.salesOrders.push(data[i]);
          }
          console.log(this.salesOrders);
          this.numberOfOrder = data.length;
          this.displayedColumns = ['id', 'status', 'deliveryDateTime', 'customerName', 'customerLineFb', 'receiverName', 'flowerFormula', 'selectEdit', 'selectDel'];
          this.dataSource = new MatTableDataSource<SalesOrderDetailListDto>(this.salesOrders);
          this.searchFilter.valueChanges.subscribe((searchFilterValue) => {
            this.dataSource.filter = searchFilterValue;
          });
    
          this.dataSource.filterPredicate = this.customFilterPredicate();
        });
      }

      customFilterPredicate() {
        const myFilterPredicate = function (data: SalesOrderDetailListDto, filter: string): boolean {
          let statusFound = data.status.toString().trim().toLowerCase().indexOf(filter.toLowerCase()) !== -1;
          let customerNameFound = data.customerName.toString().trim().toLowerCase().indexOf(filter.toLowerCase()) !== -1;
          let customerLineFbFound = data.customerLineFb.toString().trim().toLowerCase().indexOf(filter.toLowerCase()) !== -1;
          let receiverNameFound = data.receiverName.toString().trim().toLowerCase().indexOf(filter.toLowerCase()) !== -1;
    
          let flowerFormulaFound = false;
          for (let i=0; i<data.salesOrderDetails.length; i++) {
            flowerFormulaFound = data.salesOrderDetails[i].flowerFormula.name.toString().trim().toLowerCase().indexOf(filter.toLowerCase()) !== -1;
            if (flowerFormulaFound)
              break;
          }
          return statusFound || customerNameFound || customerLineFbFound || receiverNameFound || flowerFormulaFound;
        }
        return myFilterPredicate;
      }
  }  