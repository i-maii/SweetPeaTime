import { Component, Inject, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  animal: 'panda' | 'unicorn' | 'lion';
}

@Component({
  selector: 'promotion',
  templateUrl: './promotion.component.html',
  styleUrls: ['./promotion.component.css']
})

/*export class DialogDataExample {
  constructor(public dialog: MatDialog) {}

  openDialog() {
    this.dialog.open(PromotionDialogComponent, {
      data: {
        animal: 'panda'
      }
    });
  }
}*/

export class PromotionComponent implements OnInit {

  //constructor() { }

  constructor(public dialog: MatDialog) {}

  openDialog() {
    this.dialog.open(PromotionDialogComponent, {
      data: {
        animal: 'panda'
      }
    });
  }

  ngOnInit(): void {
  }

  displayedColumns: string[] = ['flowername', 'size', 'unit', 'profit', 'totalprofit', 'price', 'location', 'imageUrl'];
  dataSource = ELEMENT_DATA;

  movies = [
    {
      flower: 'กุหลาบขาว + เดซี่',
      poster: 'https://upload.wikimedia.org/wikipedia/en/4/40/Star_Wars_Phantom_Menace_poster.jpg'
    },
    {
      flower: 'ทานตะวัน + เดซี่ + ยูคาใบกลม',
      poster: 'https://upload.wikimedia.org/wikipedia/en/3/32/Star_Wars_-_Episode_II_Attack_of_the_Clones_%28movie_poster%29.jpg'
    },
    {
      flower: 'สแตติสสีม่วงหยก + แคสเปีย',
      poster: 'https://upload.wikimedia.org/wikipedia/en/9/93/Star_Wars_Episode_III_Revenge_of_the_Sith_poster.jpg'
    },
    {
      flower: 'สแตติสม่วงเข้ม',
      poster: 'https://upload.wikimedia.org/wikipedia/en/8/87/StarWarsMoviePoster1977.jpg'
    },
    {
      flower: 'ทานตะวัน + ไลเซนทัส',
      poster: 'https://upload.wikimedia.org/wikipedia/en/3/3c/SW_-_Empire_Strikes_Back.jpg'
    },
    {
      flower: 'คาร์เนชั่นสีชมพู',
      poster: 'https://upload.wikimedia.org/wikipedia/en/b/b2/ReturnOfTheJediPoster1983.jpg'
    },
    {
      flower: 'สุ่ยขาว',
      poster: 'https://upload.wikimedia.org/wikipedia/en/a/a2/Star_Wars_The_Force_Awakens_Theatrical_Poster.jpg'
    },
    {
      flower: 'กุหลาบแดง',
      poster: 'https://upload.wikimedia.org/wikipedia/en/7/7f/Star_Wars_The_Last_Jedi.jpg'
    }
  ];
  // tslint:enable:max-line-length

  drop(event: CdkDragDrop<{title: string, poster: string}[]>) {
    moveItemInArray(this.movies, event.previousIndex, event.currentIndex);
  }
}
/*----------------------------------------------------------*/
export interface PeriodicElement {
  flowername: string;
  size: string;
  unit: number;
  profit: number;
  totalprofit: number;
  price: number;
  location: string;
  imageUrl: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {flowername: 'กุหลาบขาว เดซี่', size: 'S', unit: 1, profit: 450, totalprofit: 450, price: 450, location: 'ซงหนิงหนิง', imageUrl: 'https://material.angular.io/assets/img/examples/shiba2.jpg'},
  {flowername: 'ทานตะวัน เดซี่ ยูคาใบกลม', size: 'S', unit: 1, profit: 550, totalprofit: 450, price: 450, location: 'ซงหนิงหนิง', imageUrl: 'https://material.angular.io/assets/img/examples/shiba2.jpg'},
  {flowername: 'สแตติสสีม่วงหยก แคสเปีย', size: 'M', unit: 1, profit: 450, totalprofit: 450, price: 450, location: 'ซงหนิงหนิง', imageUrl: 'https://material.angular.io/assets/img/examples/shiba2.jpg'},
  {flowername: 'สแตติสม่วงเข้ม', size: 'S', unit: 1, profit: 450, totalprofit: 450, price: 450, location: 'ซงหนิงหนิง', imageUrl: 'https://material.angular.io/assets/img/examples/shiba2.jpg'},
  {flowername: 'ทานตะวัน ไลเซนทัส', size: 'S', unit: 1, profit: 450, totalprofit: 450, price: 450, location: 'หนึ่ง', imageUrl: 'https://material.angular.io/assets/img/examples/shiba2.jpg'},
  {flowername: 'คาร์เนชั่นสีชมพู', size: 'S', unit: 1, profit: 450, totalprofit: 450, price: 450, location: 'หนึ่ง', imageUrl: 'https://material.angular.io/assets/img/examples/shiba2.jpg'},
  {flowername: 'สุ่ยขาว', size: 'S', unit: 1, profit: 450, totalprofit: 450, price: 450, location: 'หนึ่ง', imageUrl: 'https://material.angular.io/assets/img/examples/shiba2.jpg'},
  {flowername: 'กุหลาบแดง', size: 'S', unit: 1, profit: 450, totalprofit: 450, price: 450, location: 'หนึ่ง', imageUrl: 'https://material.angular.io/assets/img/examples/shiba2.jpg'},
];

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

}