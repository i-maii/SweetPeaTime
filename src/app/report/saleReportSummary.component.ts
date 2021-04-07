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
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { PromotionDetailDto } from '../interface/promotion-detail-dto';
import { Florist } from '../interface/florist';
import { FlowerFormula } from '../interface/flower-formula';
import { SaleReportSummaryByFlowerformula } from '../interface/saleReportSummarybyFlowerformula';
import { months } from 'moment';
import { Stock } from '../interface/stock';

@Component({
    selector: 'saleSummary',
    templateUrl: './saleReportSummary.component.html',
    styleUrls: ['./saleReportSummary.component.css']
  })
  

export class SaleReportSummaryComponent implements OnInit  {
salesOrders: SalesOrderDetailListDto[] = [];
saleOrderDetail: PromotionDetailDto[] = [];
totalSaleOrderByMonth = new Array();
totalCostByMonth = new Array();
totalProfitByMonth = new Array();
saleReportSumByformular: SaleReportSummaryByFlowerformula[] = [];
displayedColumns: string[] = [];
dataSource: any;
 fromDate  = new Date();
 toDate = new Date();
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: Label[] = ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม','กันยายน','ตุลาคม','พฤศจิกายน','ธันวาคม'];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];

  barChartData: ChartDataSets[] = [];
  stockByLot: Stock[]= [];
  // barChartData: ChartDataSets[] = [
  //   { data: [45, 37, 60, 70, 46, 33,0,0,0,0,0,0], label: 'ยอดขาย' },
  //   { data: [45, 37, 60, 70, 46, 33,0,0,0,0,0,0], label: 'กำไร' }
  // ];
  constructor(
    private restApiService: RestApiService,
  ) { }

  ngOnInit(): void {

    var salesOrdersMonth: SalesOrderDetailListDto[];
    var costMonth : Stock[];

    this.restApiService.searchListSalesOrder('01-01-2021', '12-31-2021', null).subscribe(async (data: SalesOrderDetailListDto[]) => {
      for (let i = 0; i < data.length; i++) {
        this.salesOrders.push(data[i]);
      }
  
      //Calculate Month 1

      for (let j = 0; j< 12 ; j++)
      {

        salesOrdersMonth = this.salesOrders.filter(item => {let date = new Date(item.date);
        return (date.getMonth()) == j});

        this.totalSaleOrderByMonth[j] = 0;
        for(let i =0; i < salesOrdersMonth.length ; i++)
        {
          this.totalSaleOrderByMonth[j] = this.totalSaleOrderByMonth[j] + salesOrdersMonth[i].flowerPrice;
        }
      } 

    })

    this.restApiService.getStockByLot('01-01-2021', '12-31-2021').subscribe(async(stockResult: Stock[]) => {
      //console.log('stock ='+ stockResult);
      for (let i = 0; i < stockResult.length; i++) {
        this.stockByLot.push(stockResult[i]);
      }

      for (let j = 0; j< 12 ; j++)
      {

        costMonth = this.stockByLot.filter(stock => {let lot = new Date(stock.lot);
        return (lot.getMonth()) == j})
          this.totalCostByMonth[j] = 0;
          for(let i =0; i < costMonth.length; i++)
          {
            if( costMonth[i].flowerPrice != null)
            {
            this.totalCostByMonth[j] = this.totalCostByMonth[j] + costMonth[i].flowerPrice.price;
            }
          }

          this.totalProfitByMonth[j] = this.totalSaleOrderByMonth[j] - this.totalCostByMonth[j];

        }

    })

    this.barChartData.push({             // <-- push value to `ChartData`
    data: this.totalSaleOrderByMonth,  
    label: 'ยอดขาย'        
    })

    this.barChartData.push({             // <-- push value to `ChartData`
    data: this.totalProfitByMonth,  
    label: 'กำไร'        
    })

  }
  selectDatabyMonth(e: any)
  {
    this.saleReportSumByformular = [];
    this.salesOrders = [];
    this.saleOrderDetail = [];
    this.dataSource = [];
      console.log("month");
      //  console.log(e._view.Label);

   // this.restApiService.searchListSalesOrder(fromDate, toDate).subscribe((data: SalesOrderDetailListDto[]) => {})
   if (e.active.length > 0) {
    const chart = e.active[0]._chart;
    var label: any;
    var dateString: string;

    const activePoints = chart.getElementAtEvent(e.event);

      if ( activePoints.length > 0) 
      {
        // get the internal index of slice in pie chart
        const clickedElementIndex = activePoints[0]._index;
        label = chart.data.labels[clickedElementIndex];
        // get value by index
        const value = chart.data.datasets[0].data[clickedElementIndex];
        console.log(clickedElementIndex, label, value)
        console.log('label index = '+ clickedElementIndex); 
        dateString = (clickedElementIndex +1).toString() + '-01-2021'; 
        this.fromDate = new Date(dateString);
        var m = this.fromDate.getMonth(); //current month
        var y = this.fromDate.getFullYear(); //current year
        
        this.toDate = new Date(y,m+1,0);
      }
      var totalPrice = 0;
      console.log('from : ' +this.fromDate + 'to : ' + this.toDate);
      this.restApiService.searchListSalesOrder(this.fromDate, this.toDate, null).subscribe(async (data: SalesOrderDetailListDto[]) => {
        for (let i = 0; i < data.length; i++) {
       
          this.salesOrders.push(data[i]);
        //  totalPrice = data[i].totalPrice;
           
            for (let j = 0; j < data[i].salesOrderDetails.length; j++)
            {
              let salesOrderDetailResult: {
                id: number;
                formulaName: String;
                size: String;
                quantity: number;
                profit: number;
                totalProfit: number;
                price: number;
                locationName: string;
                image: string;
              } = {
                id : data[i].salesOrderDetails[j].flowerFormula.id,
                formulaName: data[i].salesOrderDetails[j].flowerFormula.name,
                size: data[i].salesOrderDetails[j].flowerFormula.size,
                quantity: data[i].salesOrderDetails[j].quantity,
                profit: 0,
                totalProfit: 0,
                price: data[i].salesOrderDetails[j].salesOrder.price,
                locationName: data[i].salesOrderDetails[j].florist.name,
                image: ""
              };
              this.saleOrderDetail.push(salesOrderDetailResult);
            }
            totalPrice =0;
        }

   
        //find uniq 
        var arr = this.saleOrderDetail;
        var unique = [...new Set(this.saleOrderDetail.map(item => item.id))]; // [ 'A', 'B']
        console.log('unique = ' + unique)
        for (let j = 0; j < unique.length; j++)
        {

          let sumflowerFormulaItem: {
            id: number;
            formulaId: number;
            formulaName: String;
            quantity: number;
            totalPrice: number;
            locationName: string;
            image: string;
            } = {
            id: j,
            formulaId: unique[j],
            formulaName: String(this.saleOrderDetail.find(n=>n.id == unique[j])?.formulaName),
            quantity: 0,
            totalPrice: 0,
            locationName: "",
            image: ""
            }

          var uniqueFormular = this.saleOrderDetail.filter(s=>s.id == unique[j]);
          console.log('unique = ' + unique[j].toString() + uniqueFormular)
        for (let i = 0; i < uniqueFormular.length; i++) {

          sumflowerFormulaItem.quantity = sumflowerFormulaItem.quantity + uniqueFormular[i].quantity;
          sumflowerFormulaItem.totalPrice = sumflowerFormulaItem.totalPrice + uniqueFormular[i].price;
          this.saleReportSumByformular.push(sumflowerFormulaItem);
          }
        }
                  
        console.log(this.saleOrderDetail);
        console.log(this.saleReportSumByformular);
        this.saleReportSumByformular.sort((a, b) => b.totalPrice - a.totalPrice);

        for( let i=0; i < this.saleReportSumByformular.length; i++)
        {
          this.saleReportSumByformular[i].id = i+1;
        }

        this.dataSource = new MatTableDataSource<SaleReportSummaryByFlowerformula>(this.saleReportSumByformular);

      })
     }

     this.displayedColumns = ['id', 'formulaName', 'quantity', 'totalPrice'];
  }

}