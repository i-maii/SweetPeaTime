import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Stock } from 'src/app/interface/stock';
import { RestApiService } from 'src/app/_shared/rest-api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-delete-stock',
  templateUrl: './delete-stock.component.html',
  styleUrls: ['./delete-stock.component.css']
})
export class DeleteStockComponent implements OnInit {

  formDeleteStock: FormGroup;
  arr: any;

  constructor(
    public dialogRef: MatDialogRef<Stock>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private restApiService: RestApiService,
  ) {
    this.formDeleteStock = this.formBuilder.group({
      stockInfo: this.formBuilder.array([]),
    });
  }


  ngOnInit(): void {
    console.log(this.data);

    const stockInfo = this.formDeleteStock.controls.stockInfo as FormArray;
    for (let i = 0; i < this.data.length; i++) {
      stockInfo.push(this.formBuilder.group({
        flowerId: this.data[i].flower.flowerId,
        flowerName: this.data[i].flower.flowerName,
        deleteQuantity: '',
        remainQuantity: this.data[i].quantity,
        floristId: this.data[i].florist.id,
      }));
    }

    this.arr = this.formDeleteStock.controls.stockInfo.value;
  }

  removeRow(row: number) {
    console.log('row: ', row);
    const deleteRow = this.formDeleteStock.controls.stockInfo as FormArray;
    deleteRow.removeAt(row);

    this.arr = this.formDeleteStock.controls.stockInfo.value;
    if (this.arr.length === 0) {
      this.dialogRef.close();
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    console.log(this.formDeleteStock.controls.stockInfo.value);
    // console.log(this.formDeleteStock.value.flowerName);
    this.restApiService.deleteStock(this.formDeleteStock.controls.stockInfo.value)
      .subscribe(resp => {
        if (resp['status'] === 200) {
          this.dialogRef.close();
          Swal.fire(
            'Good job!',
            'ตัดสต๊อกสำเร็จ',
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
