import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Florist } from '../interface/florist';
import { FlowerAvailable } from '../interface/flower-available';
import { FlowerFormula } from '../interface/flower-formula';
import { PromotionDetail } from '../interface/promotion-detail';
import { SalesOrderElement } from '../interface/sales-order-element';
import { Promotion } from '../interface/promotion';
import { PromotionDetailLog } from '../interface/promotion-detail-log';

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
    return this.http.get<FlowerFormula[]>(this.apiURL + '/flowerFormula/getAll')
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

  getPromotionDetail(): Observable<PromotionDetail[]> {
    return this.http.get<PromotionDetail[]>(this.apiURL + '/promotionDetail/currentPromotion')
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  getPromotion(): Observable<Promotion[]> {
    return this.http.get<Promotion[]>(this.apiURL + '/promotion/getAll')
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  getPromotionDetailLog(isNormal: string): Observable<PromotionDetailLog[]> {
    return this.http.get<PromotionDetailLog[]>(this.apiURL + '/promotionDetailLog',{
      params:{
        'isNormal': isNormal
      }
    })
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = 'Error Code: ${error.status}\nMessage: ${error.message}';
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}