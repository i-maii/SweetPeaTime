import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PromotionDetail } from '../interface/promotion-detail';
import { PromotionDetailLog } from '../interface/promotion-detail-log';
import { RestApiService } from '../_shared/rest-api.service';
import { MatTableDataSource } from '@angular/material/table';
import { FlowerFormulaDetail } from '../interface/flower-formula-detail';
import { PromotionDetailDto } from "../interface/promotion-detail-dto";
import { PromotionDetailCurrentDto } from "../interface/promotion-detail-current-dto";

export interface DialogData {
  images: 'test';
}

@Component({
  selector: 'promotion',
  templateUrl: './promotion.component.html',
  styleUrls: ['./promotion.component.css']
})

export class PromotionComponent implements OnInit {

  promotionDetails: PromotionDetail[] = [];
  promotionDetailLogsNormal: PromotionDetailLog[] = [];
  promotionDetailLogsCurrent: PromotionDetailLog[] = [];
  flowerQuantity: FlowerFormulaDetail[] = [];
  stockQuantity: FlowerFormulaDetail[] = [];
  promotionDetailsDtos: PromotionDetailDto[] = [];
  promotionDetailsCurrentDtos: PromotionDetailCurrentDto[] = [];

  displayedColumns: string[] = [];
  displayedColumnsNormal: string[] = [];
  displayedColumnsNormalDto: string[] = [];
  displayedColumnsNormalCurrentDto: string[] = [];
    
  dataSource: any;
  dataSourceNormal: any;
  dataSourceNormalDto: any;
  dataSourceNormalCurrentDto: any;

  totalProfitNormal: any;
  totalProfitCurrent: any;
  totalprofit: any;
  cntPromotion: any;
  flowerName: any;
  count: any;
  allQuantity: any;
  weeklyPromotion: number = 20;

  //constructor(public dialog: MatDialog) {}
  constructor(
    private restApiService: RestApiService, public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.restApiService.getCurrentPromotion().subscribe((data: PromotionDetail[]) => {
      for (let i = 0; i < data.length; i++) {
        this.promotionDetails.push(data[i]);
        this.cntPromotion = data.length;
      }
    });

    this.restApiService.getNormalPromotionDetailLog().subscribe((data: PromotionDetailLog[]) => {
      for (let i = 0; i < data.length; i++) {
        this.promotionDetailLogsNormal.push(data[i]);
      }
      this.displayedColumnsNormal = ['flowername', 'size', 'unit', 'profit', 'totalprofit', 'price', 'location', 'imageUrl', 'add'];
      this.dataSourceNormal = new MatTableDataSource<PromotionDetailLog>(this.promotionDetailLogsNormal);
    });

    this.restApiService.getCurrentPromotionDetailLog().subscribe((data: PromotionDetailLog[]) => {
      for (let i = 0; i < data.length; i++) {
        this.promotionDetailLogsCurrent.push(data[i]);
      }
      this.displayedColumns = ['flowername', 'size', 'unit', 'profit', 'totalprofit', 'price', 'location', 'totalFlower', 'stock', 'imageUrl', 'add'];
      this.dataSource = new MatTableDataSource<PromotionDetailLog>(this.promotionDetailLogsCurrent);
      //console.log();
    });

    this.restApiService.getCheckFlowerFormulaDetail("8", "27").subscribe((data: FlowerFormulaDetail[]) => {
      for (let i = 0; i < data.length; i++) {
        this.flowerQuantity.push(data[i]);
      }
    });

    this.restApiService.getPromotion().subscribe((data: PromotionDetailDto[]) => {
      for (let i = 0; i < data.length; i++) {
        this.promotionDetailsDtos.push(data[i]);
      }
      this.displayedColumnsNormalDto = ['flowername', 'size', 'unit', 'profit', 'totalprofit', 'price', 'location', 'imageUrl', 'add'];
      this.dataSourceNormalDto = new MatTableDataSource<PromotionDetailDto>(this.promotionDetailsDtos);
    });

    this.restApiService.getPromotionSuggest().subscribe((data: PromotionDetailCurrentDto[]) => {
      for (let i = 0; i < data.length; i++) {
        this.promotionDetailsCurrentDtos.push(data[i]);
      }
      this.displayedColumnsNormalCurrentDto = ['flowername', 'size', 'unit', 'profit', 'totalprofit', 'price', 'location', 'imageUrl', 'add'];
      this.dataSourceNormalCurrentDto = new MatTableDataSource<PromotionDetailCurrentDto>(this.promotionDetailsCurrentDtos);
    });

    
  }

  getIdFlowerReplace(id: number) {
    //console.log(id)
    this.restApiService.updatePromotion(id);
  }

  calculateTotalProfit(profit: any, unit: any) {
    return this.totalprofit = profit * unit;
  }

  showQuantity(flowerQuantity: any,unit: any) {
    return this.allQuantity = flowerQuantity * unit;
  }

  openDialog() {
    this.dialog.open(PromotionSuccessDialogComponent, {
      data: {
        animal: 'test'
      }
    });
  }

  openDialogFlower(pathimg: any,size: any, price: any, name: any, unit: any) {
    this.dialog.open(PromotionUnitDialogComponent, {
      data: {
        imagespath: pathimg,
        flowersize: size,
        flowerprice: price,
        flowername: name,
        flowerunit: unit,
        sumprofit: price * unit
      }
    });
  } 

  openDialogReplaceFlower(pathimg: any,size: any, price: any, name: any, unit: any, cntPromotion: any) {
    if (cntPromotion == 4) {
      this.dialog.open(PromotionReplaceDialogComponent, {
        data: {
          imagespath: pathimg,
          flowersize: size,
          flowerprice: price,
          flowername: name,
          flowerunit: unit,
          sumprofit: price * unit
        }
      });
    }
    else{
      this.dialog.open(PromotionUnitDialogComponent, {
        data: {
          imagespath: pathimg,
          flowersize: size,
          flowerprice: price,
          flowername: name,
          flowerunit: unit,
          sumprofit: price * unit
        }
      });
    }
  } 

}
/*--------- Add flower current flower ---------*/
@Component({
  selector: 'promotiondialog',
  templateUrl: './promotion.dialog.component.html',
  styleUrls: ['./promotion.component.css']
})
export class PromotionDialogComponent {
  //constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  constructor(
    public dialogRef: MatDialogRef<PromotionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  displayedColumns = ['checked', 'position', 'flowername', 'stock', 'unit', 'location'];
  dataSource = ELEMENT_DATA_DIALOG;

  highlight(element: ElementDialog) {
    element.highlighted = !element.highlighted;
  }

}

export interface ElementDialog {
  checked: boolean;
  position: number;
  flowername: string;
  stock: number;
  unit: string;
  location: string;
  highlighted?: boolean;
  hovered?: boolean;
}

const ELEMENT_DATA_DIALOG: ElementDialog[] = [
  { checked: false, position: 1, flowername: 'ยูคาลิปตัส', stock: 5, unit: 'ก้าน', location: 'ซงหนิงหนิง' },
  { checked: false, position: 2, flowername: 'สุ่ย', stock: 250, unit: 'กรัม', location: 'ซงหนิงหนิง' },
  { checked: false, position: 3, flowername: 'แคสเปีนร์', stock: 300, unit: 'กรัม', location: 'ซงหนิงหนิง' },
];

/* Unit Promotion */
@Component({
  selector: 'promotiondialog',
  templateUrl: './promotion.unit.dialog.component.html',
  styleUrls: ['./promotion.component.css']
})
export class PromotionUnitDialogComponent {
  //constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  constructor(
    public dialogRef: MatDialogRef<PromotionUnitDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

    ngOnInit() {
      // will log the entire data object
      console.log(this.data)
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

/* Replace Flower */
@Component({
  selector: 'promotiondialog',
  templateUrl: './promotion.replace.dialog.component.html',
  styleUrls: ['./promotion.component.css']
})
export class PromotionReplaceDialogComponent {
  promotionId: any;
  
  constructor(
    public dialogRef: MatDialogRef<PromotionReplaceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private restApiService: RestApiService, public dialog: MatDialog
    ) {}

    promotionDetailsReplace: PromotionDetail[] = [];

    ngOnInit() {
      //console.log(this.data)

      this.restApiService.getCurrentPromotion().subscribe((data: PromotionDetail[]) => {
        for (let i = 0; i < data.length; i++) {
          this.promotionDetailsReplace.push(data[i]);
        }
      });
  
    }

    openDialog() {
      this.dialog.open(PromotionSuccessDialogComponent, {
        data: {
          animal: 'test'
        }
      });
    }

  onNoClick(): void {
    this.dialogRef.close();
  }


  getIdFlowerReplace(id: number) {
    //console.log(id)
    this.restApiService.updatePromotion(id);

  }

}

/* Replace Flower */
@Component({
  selector: 'promotiondialog',
  templateUrl: './promotion.success.dialog.component.html',
  styleUrls: ['./promotion.component.css']
})
export class PromotionSuccessDialogComponent {
  
  constructor(
    public dialogRef: MatDialogRef<PromotionSuccessDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    ) {}

    ngOnInit() {
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

}