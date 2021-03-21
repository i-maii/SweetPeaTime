import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PromotionDetail } from '../interface/promotion-detail';
import { PromotionDetailLog } from '../interface/promotion-detail-log';
import { RestApiService } from '../_shared/rest-api.service';
import { MatTableDataSource } from '@angular/material/table';
import { FlowerFormulaDetail } from '../interface/flower-formula-detail';
import { PromotionDetailDto } from "../interface/promotion-detail-dto";
import { PromotionDetailCurrentDto } from "../interface/promotion-detail-current-dto";
import Swal from 'sweetalert2';
import { FormControl } from '@angular/forms';

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
    private restApiService: RestApiService, 
    public dialog: MatDialog,
  ) { 
  }

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

  shareToFacebook(formulaName: string, price: number, imagePath: string) {
    const IMAGE_PATH = [
      { path: 'flower_1.png', url: 'https://i.ibb.co/sJV6ZxJ/flower-1.png' },
      { path: 'flower_2.png', url: 'https://i.ibb.co/Bn0c2kV/flower-2.png' },
      { path: 'flower_3.png', url: 'https://i.ibb.co/hV35KVK/flower-3.png' },
      { path: 'flower_4.png', url: 'https://i.ibb.co/wsJVzbY/flower-4.png' },
      { path: 'flower_5.png', url: 'https://i.ibb.co/qj98V9D/flower-5.png' },
      { path: 'flower_6.png', url: 'https://i.ibb.co/ZKkJ7ZV/flower-6.png' },
      { path: 'flower_7.png', url: 'https://i.ibb.co/SmQhwrZ/flower-7.png' },
      { path: 'flower_8.png', url: 'https://i.ibb.co/x3ckyPX/flower-8.png' },
      { path: 'flower.jpg', url: 'https://i.ibb.co/FnQHL4L/flower.jpg' },
    ];

    let splitted = imagePath.split('/');
    let index = IMAGE_PATH.findIndex(i => i.path === splitted[2]);

    let message = formulaName + '\nราคา ' + price + ' บาท\nสอบถามเพิ่มเติม Line : @sweetpeatimes';
    Swal.fire({
      title: 'ต้องการแชร์โปรโมชั่นนี้ใช่ไหม?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'ยกเลิก',
      confirmButtonText: 'ใช่'
    }).then((result) => {
      if (result.isConfirmed) {
        const params = {
          access_token: 'EAADbQlCqvIEBAGHAlOe90BFiyUn1XjKiHi1iI0RIsyUkwSfRXQ5fiV7h0JJw0weteXl2diVJ5ThiUr4tW4f5fQ3e3YECFNQd9a63QeebVEx3XntX9Po8yu6Hhs3PCYpTqkRwiOu9V8K05RFKLQ9UWPCdgZBKxZCOTy11lnOaZAg3ZCmmPJnR48ZA0FLUGDf83S7djn9hEsrlggtJ1CsXo',
          message: message,
          url: IMAGE_PATH[index].url
        };
        
        FB.api('/110423627789182/photos', 'post', params, (response: any) => {
          if (response.error) {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'เกิดข้อผิดพลาด',
            });
            console.log(response.error.message);
          } else {
            Swal.fire(
              'Good job!',
              'แชร์โปรโมชั่นสำเร็จ',
              'success'
            )
          }
        });
      }
    })
  }

  getIdFlowerReplace(id: number) {
    //console.log(id)
    this.restApiService.updatePromotion(id).subscribe(resp => {
      if (resp['status'] === 200) {
        Swal.fire(
          'Good job!',
          'ลบโปรโมชั่นสำเร็จ',
          'success'
        ).then((result) => {
          window.location.reload();
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'เกิดข้อผิดพลาด',
        });
      }
    });
  }

  calculateTotalProfit(profit: any, unit: any) {
    return this.totalprofit = profit * unit;
  }

  showQuantity(flowerQuantity: any, unit: any) {
    return this.allQuantity = flowerQuantity * unit;
  }

  openDialog() {
    this.dialog.open(PromotionSuccessDialogComponent, {
      data: {
        animal: 'test'
      }
    });
  }

  openDialogFlower(pathimg: any, size: any, price: any, name: any, unit: any) {
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

  openDialogReplaceFlower(pathimg: any, size: any, price: any, name: any, unit: any, location: any, profit: any, cntPromotion: any) {
    if (cntPromotion == 4) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'โปรโมชั่นปัจจุบันเต็มแล้ว กรุณาลบโปรโมชั่นปัจจุบันออกก่อนทำรายการ',
      });
    }
    else {
      this.dialog.open(PromotionUnitDialogComponent, {
        data: {
          imagespath: pathimg,
          flowersize: size,
          flowerprice: price,
          flowername: name,
          flowerunit: unit,
          sumprofit: price * unit,
          location: location,
          profit: profit,
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
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

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
    @Inject(MAT_DIALOG_DATA) public data: any,
    private restApiService: RestApiService,
  ) { }

  quantity = new FormControl('');

  ngOnInit() {
    // will log the entire data object
    // console.log(this.data)
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  replaceFlower() {
    console.log(this.data);
    this.restApiService.addPromotion(this.data.flowername, this.data.flowerprice, this.data.location, this.data.profit, this.quantity.value)
      .subscribe(resp => {
        if (resp['status'] === 200) {
          this.dialogRef.close();
          Swal.fire(
            'Good job!',
            /*'ตัดสต๊อกสำเร็จ',*/
            'เพิ่มโปรโมชั่นสำเร็จ',
            'success'
          ).then((result) => {
            window.location.reload();
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'เกิดข้อผิดพลาด',
          });
        }
      });
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
  ) { }

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
    this.restApiService.updatePromotion(id).subscribe(resp => {
      if (resp['status'] === 200) {
        this.dialogRef.close();
        Swal.fire(
          'Good job!',
          /*'ตัดสต๊อกสำเร็จ',*/
          'ลบโปรโมชั่นสำเร็จ',
          'success'
        ).then((result) => {
          window.location.reload();
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'เกิดข้อผิดพลาด',
        });
      }
    });;

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
  ) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}