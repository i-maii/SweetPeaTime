import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { RestApiService } from '../_shared/rest-api.service';
import { SalesOrderDetail } from '../interface/sales-order-detail'
import { MatDialog } from '@angular/material/dialog';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { SalesOrderElement } from '../interface/sales-order-element';
import { SalesOrderDetailListDto } from '../interface/sales-order-detail-list-dto';
import { ThisReceiver } from '@angular/compiler';

@Component({
    selector: 'report',
    templateUrl: './saleReport.component.html',
    styleUrls: ['./saleReport.component.css']
  })
  
  export class SaleReportComponent implements OnInit {
   
  salesOrders: SalesOrderDetailListDto[] = [];
  numberOfOrder: number = 0;
  totalAmount: number = 0;
  displayedColumns: string[] = [];
  dataSource: any;
  searchFilter = new FormControl();
  saleReportForm = new FormGroup({
    startDate: new FormControl(),
    endDate: new FormControl(),
  });
  currentDate = new Date();
  endDate = new Date();

  constructor(
    private restApiService: RestApiService,
    public dialog: MatDialog,
  ) { }


    ngOnInit(): void {
        this.restApiService.searchListSalesOrder(this.currentDate,this.endDate).subscribe((data: SalesOrderDetailListDto[]) => {
          for (let i = 0; i < data.length; i++) {
            this.salesOrders.push(data[i]);
            this.totalAmount = this.totalAmount + data[i].flowerPrice;
          }
          console.log(this.salesOrders);
          this.numberOfOrder = data.length;
         this.displayedColumns = ['id', 'date', 'status', 'customerName', 'customerLineFb', 'receiverName', 'flowerFormula' ,'totalPrice', 'florist'];
          this.dataSource = new MatTableDataSource<SalesOrderDetailListDto>(this.salesOrders);
         // this.searchFilter.valueChanges.subscribe((searchFilterValue) => {
          //  this.dataSource.filter = searchFilterValue;
          //});
    
       //   this.dataSource.filterPredicate = this.customFilterPredicate();
        });
      }

      searchSaleReport() {}
      getTotalAmount() {
        return this.totalAmount;
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