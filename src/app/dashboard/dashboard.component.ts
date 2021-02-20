import { Component, OnInit } from '@angular/core';
import { PromotionDetail } from '../interface/promotion-detail';
import { RestApiService } from '../_shared/rest-api.service';
@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  promotionDetails: PromotionDetail[] = [];

  constructor(
    private restApiService: RestApiService
  ) { }

  ngOnInit(): void {
    this.restApiService.getPromotionDetail().subscribe((data: PromotionDetail[]) => {
      for (let i = 0; i < data.length; i++) {
        this.promotionDetails.push(data[i]);
      }
    });
  }

}
