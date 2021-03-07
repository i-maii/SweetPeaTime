import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { PromotionDetail } from '../interface/promotion-detail';
import { PromotionDetailLog } from '../interface/promotion-detail-log';
import { CreateSalesOrder } from '../interface/create-sales-order';
import { Florist } from '../interface/florist';
import { FlowerAvailable } from '../interface/flower-available';
import { FlowerFormula } from '../interface/flower-formula'
import { SalesOrderDetail } from '../interface/sales-order-detail';
import { SalesOrderElement } from '../interface/sales-order-element';
import { SalesOrderPrice } from '../interface/sales-order-price';
import { Flower } from '../interface/flower';
import { FlowerFormulaDetail } from "../interface/flower-formula-detail";
import { PromotionDetailDto } from "../interface/promotion-detail-dto";
import { PromotionDetailCurrentDto } from "../interface/promotion-detail-current-dto";

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

  searchAllFlowerFormula(): Observable<FlowerFormula[]> {
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

  searchFlowerFormula(searchFlowerForm: any): Observable<FlowerFormula[]> {
    let params = new HttpParams;
    searchFlowerForm.name? params = params.append('name', searchFlowerForm.name): '';
    searchFlowerForm.pattern? params = params.append('pattern', searchFlowerForm.pattern): '';
    searchFlowerForm.occasion? params = params.append('occasion', searchFlowerForm.occasion): '';
    searchFlowerForm.price? params = params.append('price', searchFlowerForm.price): '';
    searchFlowerForm.quantityAvailable? params = params.append('quantityAvailable', searchFlowerForm.quantityAvailable): '';
    searchFlowerForm.size? params = params.append('size', searchFlowerForm.size): '';

    return this.http.post<FlowerFormula[]>(this.apiURL + '/flowerFormula/search', null, {params: params})
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  getSalesOrderDetail(salesOrderId: number): Observable<SalesOrderDetail> {
    let params = new HttpParams;
    params = params.append('salesOrderId', salesOrderId+"");
    return this.http.get<SalesOrderDetail>(this.apiURL + '/salesOrderDetail/getAllBySaleOrder', {
      params: params
    })
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

  getFlowerAvailable(formulaId: number, floristId: number): Observable<FlowerAvailable[]> {
    let params = new HttpParams;
    params = params.append('formulaId', formulaId+"");
    params = params.append('floristId', floristId+"");
    return this.http.get<FlowerAvailable[]>(this.apiURL + '/flowerFormulaDetail/getFormulaDetail', {
      params: params
    })
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
  
  getSalesOrderPrice(formulaId: number, floristId: number, totalOrder: number): Observable<SalesOrderPrice> {
    let params = new HttpParams;
    params = params.append('formulaId', formulaId+"");
    params = params.append('floristId', floristId+"");
    params = params.append('totalOrder', totalOrder+"");
    return this.http.get<SalesOrderPrice>(this.apiURL + '/flowerFormula/priceOfSalesOrder', {
      params: params
    })
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
  
  createSalesOrder(salesOrder: CreateSalesOrder) {
    console.log("test create salesorder " + salesOrder.note);
    this.http.post(this.apiURL + '/salesOrder/createSalesOrder', salesOrder).subscribe(
      (val) => {
          console.log("POST call successful value returned in body", 
                      val);
      },
      response => {
          console.log("POST call in error", response);
      },
      () => {
          console.log("The POST observable is now completed.");
      });
  }

  getFlower(): Observable<Flower[]> {
    return this.http.get<Flower[]>(this.apiURL + '/flower/getAll')
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  getStock(flowerId: any): Observable<FlowerFormulaDetail[]> {
    let params = new HttpParams;
    params = params.append('flowerId', flowerId+"");
    return this.http.get<FlowerFormulaDetail[]>(this.apiURL + '/flowerFormulaDetail/getPromotion',{
      params: params
    })
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  getCheckFlowerFormulaDetail(formulaId: any, flowerId: any): Observable<FlowerFormulaDetail[]> {
    let params = new HttpParams;
    params = params.append('formulaId', formulaId+"");
    params = params.append('flowerId', flowerId+"");
    return this.http.get<FlowerFormulaDetail[]>(this.apiURL + '/flowerFormulaDetail/getQuantityPromotion',{
      params: params
    })
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  updatePromotion(promotionId: number) {
    console.log(promotionId);
    let params = new HttpParams;
    params = params.append('promotionId', promotionId + "");

    this.http.post(this.apiURL + '/promotionDetail/updatePromotion?', null, {params: params})
    .subscribe(
      (val) => {
          console.log("POST call successful value returned in body", 
                      val);
      },
      response => {
          console.log("POST call in error", response);
      },
      () => {
          console.log("The POST observable is now completed.");
      });
  }

  getPromotion(): Observable<PromotionDetailDto[]> {
    return this.http.get<PromotionDetailDto[]>(this.apiURL + '/promotionDetail/getPromotion')
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  getPromotionSuggest(): Observable<PromotionDetailCurrentDto[]> {
    return this.http.get<PromotionDetailCurrentDto[]>(this.apiURL + '/promotionDetail/getPromotionSuggest')
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