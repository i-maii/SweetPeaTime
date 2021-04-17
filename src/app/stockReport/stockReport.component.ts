import { Component, OnInit } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { RestApiService } from '../_shared/rest-api.service';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { StockReport } from '../interface/stockReport';
import { Stock } from '../interface/stock';
import { Flower } from '../interface/flower';
import { Florist } from '../interface/florist';
import { PromotionDetail } from '../interface/promotion-detail';
import { PromotionDetailLog } from '../interface/promotion-detail-log';
import { FlowerFormulaDetail } from '../interface/flower-formula-detail';
import { FlowerFormula } from '../interface/flower-formula';

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
    promotionDetails: PromotionDetail[] = [];
    formulaDetails: FlowerFormulaDetail[] = [];


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
    async ngOnInit(): Promise<void> {
      this.stockReport = [];
        this.displayedColumns = ['id', 'flower', 'florist','lot', 'expireDate', 'quantity','inPromotionQty', 'inPromotionSoldQty' ,'waste','unit'];
       
        this.promotionDetails = await this.restApiService.getCurrentPromotion().toPromise();

        // this.restApiService.getCurrentPromotion().subscribe(async (data: PromotionDetail[]) => {
        //   for (let i = 0; i < data.length; i++) {
        //     this.promotionDetails.push(data[i]);
        //   }
        // });
        console.log( 'Promotion Detail' +this.formulaDetails);

        //TODO find flower in flower formula detail  get formuladetial from formulaId in promotion
        for (let i = 0; i < this.promotionDetails.length; i++)
        {
          this.restApiService.getFormulaDetailsFromFormulaId(this.promotionDetails[i].flowerFormula.id).subscribe(async (data: FlowerFormulaDetail[]) => {
            for (let j = 0; j < data.length; j++) {
              this.formulaDetails.push(data[j]);
            }
          });
        }

        console.log( 'formola Detail' +this.formulaDetails);
        this.restApiService.getStockByDate('01-01-2021','12-31-2021').subscribe(async(stockResult: Stock[]) => {
            for (let i = 0; i < stockResult.length; i++) {
                this.stock.push(stockResult[i]);
              //  this.stock = this.totalAmount + data[i].flowerPrice;
                var expireDate = new Date(stockResult[i].lot);
               expireDate.setDate(expireDate.getDate() + stockResult[i].flower.lifeTime);
              /// expireDate.setDate(result);
              //  console.log('expire = ' + expireDate);
               // expireDate.
               // expireDate.setDate( stockResult[i].lot.getDate() + 1);
//this.addDays(new Date(this.gDetailDS.activeFrom),this.gDetailDS.activeNoDays)
//console.log('expire'+ expireDate.getDate())
var lot = new Date(stockResult[i].lot);
var expireDays = Number(expireDate.getDay());
var currentDate =  new Date();
var currentDays = Number(currentDate.getDay());
var lifeTime = 0;
var promotionQty = 0;
var promotionSoldQty = 0;
var formulaDetailsFilter: FlowerFormulaDetail[] = [];
var promotionDetailsFilter: PromotionDetail[] = [];


if (expireDays - currentDays < 0 )
{
  lifeTime = 0;
} 
else
{
  lifeTime = expireDays - currentDays;
}
//TODO formulaDetailFilter =  filter by flower 
console.log('flower name = ' + stockResult[i].flower.flowerName);
 formulaDetailsFilter = this.formulaDetails.filter(p=>p.flower.flowerName == stockResult[i].flower.flowerName);

 for(let j= 0; j < formulaDetailsFilter.length ; j++)
 {
    promotionQty = promotionQty +  formulaDetailsFilter[j].quantity;
    promotionDetailsFilter = this.promotionDetails.filter(f=>f.flowerFormula.id==formulaDetailsFilter[j].flowerFormula.id)
    if (promotionDetailsFilter != null)
    {
    promotionSoldQty = promotionDetailsFilter[0].quantitySold * formulaDetailsFilter[j].quantity;
    }
 }

console.log('promoQty = '+ promotionQty + 'SoldQty = ' + promotionSoldQty)

//console.log('expire = ' + expireDays + 'today = ' + currentDays)
              let stockItem: {
                id: number;
                flower: Flower;
                quantity: number;
                unit: string;
                lot: Date;
                florist: Florist;
                expireDate : number;
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
                expireDate : lifeTime,
                inPromotionQty : promotionQty,
                inPromotionSoldQty : promotionSoldQty,
                waste : 0
              };
              this.stockReport.push(stockItem);
              promotionSoldQty = 0;
              promotionQty = 0;
              promotionDetailsFilter = [];
              formulaDetailsFilter = [];
              }
             // console.log(this.promotionDetails);
        this.dataSource = new MatTableDataSource<StockReport>(this.stockReport);
        })

    }

    searchStockReport()
    {
      this.restApiService.getStockByDate('01-01-2021','12-31-2021').subscribe(async(stockResult: Stock[]) => {
        for (let i = 0; i < stockResult.length; i++) {
            this.stock.push(stockResult[i]);
          //  this.stock = this.totalAmount + data[i].flowerPrice;
            var expireDate = new Date(stockResult[i].lot);
           expireDate.setDate(expireDate.getDate() + stockResult[i].flower.lifeTime);

var lot = new Date(stockResult[i].lot);
var expireDays = Number(expireDate.getDay());
var currentDate =  new Date();
var currentDays = Number(currentDate.getDay());
var lifeTime = 0;
var promotionQty = 0;
var promotionSoldQty = 0;
var formulaDetailsFilter: FlowerFormulaDetail[] = [];
var promotionDetailsFilter: PromotionDetail[] = [];


if (expireDays - currentDays < 0 )
{
lifeTime = 0;
} 
else
{
lifeTime = expireDays - currentDays;
}



//TODO formulaDetailFilter =  filter by flower 
console.log('flower name = ' + stockResult[i].flower.flowerName);
formulaDetailsFilter = this.formulaDetails.filter(p=>p.flower.flowerName == stockResult[i].flower.flowerName);

for(let j= 0; j < formulaDetailsFilter.length ; j++)
{
promotionQty = promotionQty +  formulaDetailsFilter[j].quantity;
promotionDetailsFilter = this.promotionDetails.filter(f=>f.flowerFormula.id==formulaDetailsFilter[j].flowerFormula.id)
if (promotionDetailsFilter != null)
{
promotionSoldQty = promotionDetailsFilter[0].quantitySold * formulaDetailsFilter[j].quantity;
}

}
console.log('promoQty = '+ promotionQty + 'SoldQty = ' + promotionSoldQty)

          let stockItem: {
            id: number;
            flower: Flower;
            quantity: number;
            unit: string;
            lot: Date;
            florist: Florist;
            expireDate : number;
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
            expireDate : lifeTime,
            inPromotionQty : promotionQty,
            inPromotionSoldQty : promotionSoldQty,
            waste : 0
          };
          this.stockReport.push(stockItem);
          promotionSoldQty = 0;
          promotionQty = 0;
          promotionDetailsFilter = [];
          formulaDetailsFilter = [];
          }

      this.dataSource = new MatTableDataSource<StockReport>(this.stockReport);
    })


    }


}

function getDifferenceInDays(lot: Date, expireDate: Date): number {
    throw new Error('Function not implemented.');
}
