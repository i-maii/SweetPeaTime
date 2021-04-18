import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PromotionDetail } from '../interface/promotion-detail';
import { PromotionDetailLog } from '../interface/promotion-detail-log';
import { RestApiService } from '../_shared/rest-api.service';
import { MatTableDataSource } from '@angular/material/table';
import { FlowerFormulaDetail } from '../interface/flower-formula-detail';
import { PromotionDetailDto } from "../interface/promotion-detail-dto";
import { PromotionDetailCurrentDto } from "../interface/promotion-detail-current-dto";
import { Configurations } from '../interface/configurations';
import Swal from 'sweetalert2';
import { FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';

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
  configurations: Configurations[] = [];

  promotionDetailList: PromotionDetail[] = [];

  displayedColumns: string[] = [];
  displayedColumnsNormal: string[] = [];
  displayedColumnsNormalDto: string[] = [];
  displayedColumnsNormalCurrentDto: string[] = [];
  displayedMaxPromotion: string[] = [];

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
  datepipe: any;
  stockDate: String | undefined;
  lot: String | undefined;
  maxPromotion: String | undefined;

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

    this.restApiService.getMaxPromotion().subscribe((maxPromotion: Configurations[]) => {
      for (let i = 0; i < maxPromotion.length; i++) {
        this.displayedMaxPromotion.push(maxPromotion[i].value);
      }
    });
    
    this.restApiService.getPromotionDetailLog().subscribe((data: PromotionDetailLog[]) => {
      for (let i = 0; i < data.length; i++) {
        this.promotionDetailLogsNormal.push(data[i]);
      }
      this.displayedColumnsNormal = ['flowername', 'size', 'unit', 'profit', 'totalprofit', 'price', 'lot', 'location', 'imageUrl', 'add'];
      this.dataSourceNormal = new MatTableDataSource<PromotionDetailLog>(this.promotionDetailLogsNormal);
    });

    this.restApiService.getPromotionDetailLogRemainQuantity().subscribe((data: PromotionDetailCurrentDto[]) => {
      for (let i = 0; i < data.length; i++) {
        this.promotionDetailsCurrentDtos.push(data[i]);
      }
      this.displayedColumnsNormalCurrentDto = ['flowername', 'size', 'unit', 'profit', 'totalprofit', 'price', 'location', 'quantityFlower', 'stock', 'imageUrl', 'add'];
      this.dataSourceNormalCurrentDto = new MatTableDataSource<PromotionDetailCurrentDto>(this.promotionDetailsCurrentDtos);
    });

  }
  
  IMAGE_PATH = [
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

  shareAll(promotionDetail: PromotionDetail[]) {
    console.log(promotionDetail);
    Swal.fire({
      title: 'ต้องการแชร์โปรโมชั่นทั้งหมดใช่ไหม?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'ยกเลิก',
      confirmButtonText: 'ใช่'
    }).then((result) => {
      if (result.isConfirmed) {
        this.shareToFacebookAll(promotionDetail).then((response) => {
          if (response === 4) {
            Swal.fire(
              'Good job!',
              'แชร์โปรโมชั่นสำเร็จ',
              'success'
            )
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'เกิดข้อผิดพลาด',
            });
          }
        });
      }
    })
  }

  async shareToFacebookAll(promotionDetail: PromotionDetail[]) {
    let cnt = 0;
    for (let pd of promotionDetail) {
      let splitted = pd.flowerFormula.imagePath.split('/');
      let index = this.IMAGE_PATH.findIndex(i => i.path === splitted[2]);
      let message = pd.flowerFormula.name + '\nราคา ' + pd.price + ' บาท\nสอบถามเพิ่มเติม Line : @sweetpeatimes';

      const params = {
        access_token: 'EAADbQlCqvIEBAIN0N1mid4T4O7jLtp6VcFlZAl4zlfd2rBSaZAGap2ceMDjUxPtHAi0GgqnP8suLZCz2iyLqh9rlEN7ZBDsbOANDrtydabVfc26HEZAHFtMINlA0rwGyq4ZC00V4F2wGV04vfnb1tJLQAHLWw2VY39HAeizgbybp1prlSVZC9t2j79w8ZAchNcolzbpveuEjZA7EmR1Lsnmg0',
        message: message,
        url: this.IMAGE_PATH[index].url
      };

      await new Promise((resolve: any) => {
        FB.api('/110423627789182/photos', 'post', params, (response: any) => {
          if (response.error) {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'เกิดข้อผิดพลาด',
            });

            console.log(response.error.message);
          } else {
            cnt++;
          }
          resolve();
        });
      });
    }
    return cnt;
  }

  shareToFacebook(formulaName: string, price: number, imagePath: string) {
    let splitted = imagePath.split('/');
    let index = this.IMAGE_PATH.findIndex(i => i.path === splitted[2]);

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
          access_token: 'EAADbQlCqvIEBAIN0N1mid4T4O7jLtp6VcFlZAl4zlfd2rBSaZAGap2ceMDjUxPtHAi0GgqnP8suLZCz2iyLqh9rlEN7ZBDsbOANDrtydabVfc26HEZAHFtMINlA0rwGyq4ZC00V4F2wGV04vfnb1tJLQAHLWw2VY39HAeizgbybp1prlSVZC9t2j79w8ZAchNcolzbpveuEjZA7EmR1Lsnmg0',
          message: message,
          url: this.IMAGE_PATH[index].url
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

  setFormatDateLotStock(lotStock: any) {
    //console.log(lotStock + 1);
    this.stockDate = lotStock.substring(0, 10);
    return this.lot = this.stockDate;
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

  openDialogReplaceFlower(pathimg: any, size: any, price: any, name: any, unit: any, location: any, profit: any, cntPromotion: any, numberPromotion: any) {
    if (cntPromotion == numberPromotion) {
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
    // console.log("flowerunit " + this.data.flowerunit);
    // console.log("quantity " + this.quantity.value);
    if(this.quantity.value > this.data.flowerunit){
      Swal.fire(
          'error',
          'จำนวนช่อที่เลือกไม่ถูกต้อง',
          'error'
        ).then((result) => {
            window.location.reload();
      });
    }else if (this.quantity.value < 1){
      Swal.fire(
          'error',
          'จำนวนช่อที่เลือกไม่ถูกต้อง',
          'error'
        ).then((result) => {
            window.location.reload();
      });
    }
    else{
      this.restApiService.recalculatePromotion(this.data.flowername, this.data.flowerprice, this.data.location, this.data.profit, this.quantity.value)
      .subscribe(resp => {
        if (resp['status'] === 200) {
          text: 'จำนวนช่อที่เลือกไม่ถูกต้อง'
        } 
        else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'เกิดข้อผิดพลาด',
          });
        }
      });

      this.restApiService.addPromotion(this.data.flowername, this.data.flowerprice, this.data.location, this.data.profit, this.quantity.value)
      .subscribe(resp => {
        if (resp['status'] === 200) {
          this.dialogRef.close();
          Swal.fire(
            'Good job!',
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