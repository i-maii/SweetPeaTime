import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PromotionDetail } from '../interface/promotion-detail';
import { PromotionDetailLog } from '../interface/promotion-detail-log';
import { RestApiService } from '../_shared/rest-api.service';
import { MatTable, MatTableDataSource } from '@angular/material/table';

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
  promotionDetailLogs: PromotionDetailLog[] = [];
  promotionDetailLogsCurrent: PromotionDetailLog[] = [];

  ELEMENT_DATA: PromotionDetail[] = [];
  ELEMENT_DATA2: PromotionDetailLog[] = [];
  //ELEMENT_DATA3: PromotionDetailLog[] = [];

  displayedColumns: string[] = [];
  displayedColumns2: string[] = [];
  //displayedColumns3: string[] = [];

  dataSource: any;
  dataSource2: any;
  //dataSource3: any;

  //constructor(public dialog: MatDialog) {}
  constructor(
    private restApiService: RestApiService, public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.restApiService.getPromotionDetail().subscribe((data: PromotionDetail[]) => {
      for (let i = 0; i < data.length; i++) {
        this.promotionDetails.push(data[i]);
      }
    });

    this.restApiService.getPromotionDetailLog('true').subscribe((data: PromotionDetailLog[]) => {
      for (let i = 0; i < data.length; i++) {
        this.ELEMENT_DATA2.push(data[i]);
      }
      this.displayedColumns2 = ['flowername', 'size', 'unit', 'profit', 'totalprofit', 'price', 'location', 'imageUrl', 'add'];
      this.dataSource2 = new MatTableDataSource<PromotionDetailLog>(this.ELEMENT_DATA2);
    });

    this.restApiService.getPromotionDetailLog('false').subscribe((data: PromotionDetailLog[]) => {
      for (let i = 0; i < data.length; i++) {
        this.promotionDetailLogsCurrent.push(data[i]);
      }
    });
  }

  openDialog() {
    this.dialog.open(PromotionDialogComponent, {
      data: {
        animal: 'panda'
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

/*--------- Unit Promotion ---------*/
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