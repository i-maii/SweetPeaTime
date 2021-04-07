import { Component, OnInit } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { RestApiService } from '../_shared/rest-api.service';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { StockReport } from '../interface/stockReport';
import { Stock } from '../interface/stock';
import { Flower } from '../interface/flower';
import { Florist } from '../interface/florist';

@Component({
    selector: 'stockReport',
    templateUrl: './stockReport.component.html',
    styleUrls: ['./stockReport.component.css']
  })
  
export class StockReportComponent implements OnInit {
    selectedValue: string | undefined;
    displayedColumns: string[] = [];
    dataSource: any;
    stockReport: StockReport[] = [];
    stock: Stock[] = [];
    

    flowers = [
        { value: '1', viewValue: 'กุหลาบขาว' },
        { value: '2', viewValue: 'กุหลาบแดง' },
        { value: '3', viewValue: 'กุหลาบชมพู' },
        { value: '4', viewValue: 'กุหลาบมาแชล' },
        { value: '5', viewValue: 'ทานตะวัน' },
        { value: '6', viewValue: 'ไฮเดนเยีย' }
      ];

      month = [
          {value: '1', viewValue: 'มกราคม' },
          {value: '2', viewValue: 'กุมภาพันธ์' },
          {value: '3', viewValue: 'มีนาคม' },
          {value: '4', viewValue: 'เมษายน' },
          {value: '5', viewValue: 'พฤษภาคม' },
          {value: '6', viewValue: 'มิถุนายน' },
          {value: '7', viewValue: 'กรกฏาคม' },
          {value: '8', viewValue: 'สิงหาคม' },
          {value: '9', viewValue: 'กันยายน' },
          {value: '10', viewValue: 'ตุลาคม' },
          {value: '11', viewValue: 'พฤศจิกายน' },
          {value: '12', viewValue: 'ธันวาคม' }
      ];
    stockReportForm = new FormGroup({
        flower: new FormControl(),
        month: new FormControl(),
      });
      currentDate = new Date();
      endDate = new Date();

      constructor(
        private restApiService: RestApiService,
      ) { }
    ngOnInit(): void {
        this.displayedColumns = ['id', 'flower', 'florist','lot', 'expireDate', 'quantity','inPromotionQty', 'inPromotionSoldQty' ,'waste','unit'];
        
        this.restApiService.getStockByDate('01-01-2021','12-31-2021').subscribe(async(stockResult: Stock[]) => {
            for (let i = 0; i < stockResult.length; i++) {
                this.stock.push(stockResult[i]);
              //  this.stock = this.totalAmount + data[i].flowerPrice;
                var expireDate = new Date();
               // expireDate.setDate( stockResult[i].lot.getDate() + 1);
//this.addDays(new Date(this.gDetailDS.activeFrom),this.gDetailDS.activeNoDays)

              let stockItem: {
                id: number;
                flower: Flower;
                quantity: number;
                unit: string;
                lot: Date;
                florist: Florist;
                expireDate : Date;
                inPromotionQty : number;
                inPromotionSoldQty : number;
                waste : number;
              } = {
                id: i+1,
                flower: stockResult[i].flower,
                quantity: stockResult[i].quantity,
                unit: stockResult[i].unit,
                lot: stockResult[i].lot,
                florist: stockResult[i].florist,
                expireDate : expireDate,
                inPromotionQty : 0,
                inPromotionSoldQty : 0,
                waste : 0
              };
              this.stockReport.push(stockItem);


              }


        this.dataSource = new MatTableDataSource<StockReport>(this.stockReport);
        })

    }

    searchStockReport()
    {}


}