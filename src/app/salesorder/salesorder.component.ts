import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { RestApiService } from '../_shared/rest-api.service';
import { SalesOrderDetail } from '../interface/sales-order-detail'
import { MatDialog } from '@angular/material/dialog';
import { EditSalesOrderComponent } from './edit-sales-order/edit-sales-order.component';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'salesorder',
  templateUrl: './salesorder.component.html',
  styleUrls: ['./salesorder.component.css']
})

export class SalesorderComponent implements OnInit {

  salesOrders: SalesOrderDetail[] = [];
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
    this.restApiService.getAllSalesOrderDetail().subscribe((data: SalesOrderDetail[]) => {
      for (let i = 0; i < data.length; i++) {
        this.salesOrders.push(data[i]);
      }
      this.numberOfOrder = data.length;
      this.displayedColumns = ['id', 'status', 'deliveryDateTime', 'customerName', 'customerLineFb', 'receiverName', 'flowerFormula', 'selectEdit', 'selectDel'];
      this.dataSource = new MatTableDataSource<SalesOrderDetail>(this.salesOrders);
      this.searchFilter.valueChanges.subscribe((searchFilterValue) => {
        this.dataSource.filter = searchFilterValue;
      });

      this.dataSource.filterPredicate = this.customFilterPredicate();
    });
  }

  openDialog(row: SalesOrderDetail): void {
    console.log(row.salesOrder.id);
    this.restApiService.getSalesOrderDetail(row.salesOrder.id).subscribe((data: SalesOrderDetail[]) => {
      console.log(data);
      for (let i = 0; i < data.length; i++) {

        const dialogRef = this.dialog.open(EditSalesOrderComponent, {
          data: {
            id: data[0].salesOrder.id,
            customerName: data[0].salesOrder.customerName,
            customerPhone: data[0].salesOrder.customerPhone,
            customerLineFb: data[0].salesOrder.customerLineFb,
            date: data[0].salesOrder.date,
            receiverName: data[0].salesOrder.receiverName,
            receiverPhone: data[0].salesOrder.receiverPhone,
            receiverAddress: data[0].salesOrder.receiverAddress,
            receiveDateTime: data[0].salesOrder.deliveryDateTime,
            flowerFormula: data[i].flowerFormula.id,
            orderTotal: data[i].quantity,
            flowerPrice: data[0].salesOrder.price,
            deliveryFee: data[0].salesOrder.deliveryPrice,
            totalPrice: data[0].salesOrder.totalPrice,
            florist: data[0].florist.id,
            note: data[0].salesOrder.note,
            status: data[0].salesOrder.status
          }
        });
      }
    });

  }

  deleteSalesorder(row: SalesOrderDetail): void {
    console.log(row);
    if (row.salesOrder.status === "ส่งแล้ว") {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'ไม่สามารถยกเลิกออเดอร์นี้ได้ เนื่องจากสถานะ: ส่งแล้ว'
      })
    } else {
      Swal.fire({
        title: 'จะยกเลิกออเดอร์นี้ใช่ไหม?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'ยกเลิก',
        confirmButtonText: 'ใช่, ยกเลิก!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.restApiService.cancelSalesOrder(row);
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        }
      })
    }

  }

  customFilterPredicate() {
    const myFilterPredicate = function (data: SalesOrderDetail, filter: string): boolean {
      let statusFound = data.salesOrder.status.toString().trim().toLowerCase().indexOf(filter.toLowerCase()) !== -1;
      let customerNameFound = data.salesOrder.customerName.toString().trim().toLowerCase().indexOf(filter.toLowerCase()) !== -1;
      let customerLineFbFound = data.salesOrder.customerLineFb.toString().trim().toLowerCase().indexOf(filter.toLowerCase()) !== -1;
      let receiverNameFound = data.salesOrder.receiverName.toString().trim().toLowerCase().indexOf(filter.toLowerCase()) !== -1;
      let flowerFormulaFound = data.flowerFormula.name.toString().trim().toLowerCase().indexOf(filter.toLowerCase()) !== -1;

      return statusFound || customerNameFound || customerLineFbFound || receiverNameFound || flowerFormulaFound;
    }
    return myFilterPredicate;
  }
}
