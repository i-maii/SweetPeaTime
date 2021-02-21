import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Florist } from '../interface/florist';
import { FlowerAvailable } from '../interface/flower-available';
import { FlowerFormula } from '../interface/flower-formula';
import { PromotionDetail } from '../interface/promotion-detail';
import { PromotionDetailLog } from '../interface/promotion-detail-log';
import { SalesOrderElement } from '../interface/sales-order-element';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  apiURL = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  getFlowerFormula(): Observable<FlowerFormula[]> {
    return this.http.get<FlowerFormula[]>(this.apiURL + '/flowerFormula/getAll?flowerId=' + 1 + '&floristId=' + 2)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  getSalesOrder(): Observable<SalesOrderElement[]> {
    return this.http.get<SalesOrderElement[]>(this.apiURL + '/salesOrder/getAll')
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  getFlorist(): Observable<Florist[]> {
    return this.http.get<Florist[]>(this.apiURL + '/florist/getAll')
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  getFlowerAvailable(id: number): Observable<FlowerAvailable[]> {
    return this.http.get<FlowerAvailable[]>(this.apiURL + '/flowerFormula/getQuantityAvailable/' + id)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  getCurrentPromotion(): Observable<PromotionDetail[]> {
    return this.http.get<PromotionDetail[]>(this.apiURL + '/promotionDetail/currentPromotion')
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  getCurrentPromotionDetailLog(): Observable<PromotionDetailLog[]> {
    return this.http.get<PromotionDetailLog[]>(this.apiURL + '/promotionDetailLog/current')
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  getNormalPromotionDetailLog(): Observable<PromotionDetailLog[]> {
    return this.http.get<PromotionDetailLog[]>(this.apiURL + '/promotionDetailLog/normal')
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  handleError(error: HttpErrorResponse) {
    window.alert(error.error);
    return throwError(error.message);
  }
}