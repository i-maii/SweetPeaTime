import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { PromotionDetail } from '../interface/promotion-detail';
import { PromotionDetailLog } from '../interface/promotion-detail-log';
import { Florist } from '../interface/florist';
import { FlowerFormula } from '../interface/flower-formula'
import { SalesOrderDetail } from '../interface/sales-order-detail';
import { SalesOrderElement } from '../interface/sales-order-element';
import { SalesOrderPrice } from '../interface/sales-order-price';
import { DatePipe } from '@angular/common';
import { SalesOrderDetailListDto } from '../interface/sales-order-detail-list-dto';
import { Stock } from '../interface/stock';
import { Flower } from '../interface/flower';
import { DeleteStock } from '../interface/delete-stock';
import { AddStock } from '../interface/add-stock';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  apiURL = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private datepipe: DatePipe
  ) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  getFlowerFormula(): Observable<FlowerFormula[]> {
    return this.http.get<FlowerFormula[]>(this.apiURL + '/flowerFormula/getflowerFormula')
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

  getListSalesOrder(): Observable<SalesOrderDetailListDto[]> {
    return this.http.get<SalesOrderDetailListDto[]>(this.apiURL + '/salesOrder/getSalesOrderDetailListDto')
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  getAllSalesOrderDetail(): Observable<SalesOrderDetail[]> {
    return this.http.get<SalesOrderDetail[]>(this.apiURL + '/salesOrderDetail/getAllSalesOrderDetail')
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

  getSalesOrderDetail(salesOrderId: number): Observable<SalesOrderDetail[]> {
    let params = new HttpParams;
    params = params.append('salesOrderId', salesOrderId+"");
    return this.http.get<SalesOrderDetail[]>(this.apiURL + '/salesOrderDetail/getBySalesOrder', {
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

  getFlowerAvailable(formulaId: number, floristId: number, orderDate: Date): Observable<number> {
    let params = new HttpParams;
    params = params.append('formulaId', formulaId+"");
    params = params.append('floristId', floristId+"");
    params = params.append('orderDate', this.datepipe.transform(orderDate, 'yyyy-MM-dd')+"");
    console.log(params);
    return this.http.get<number>(this.apiURL + '/flowerFormulaDetail/getFormulaDetail', {
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
  
  getSalesOrderPrice(formulaId: number, floristId: number, totalOrder: number, flowerPrice: number, receiveDateTime: Date): Observable<SalesOrderPrice> {
    let params = new HttpParams;
    params = params.append('formulaId', formulaId+"");
    params = params.append('floristId', floristId+"");
    params = params.append('totalOrder', totalOrder+"");
    params = params.append('flowerPrice', flowerPrice+"");
    params = params.append('receiveDateTime', this.datepipe.transform(receiveDateTime, 'yyyy-MM-dd')+"");
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
  
  createSalesOrder(salesOrder: SalesOrderElement) {
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

  updateSalesOrder(salesOrder: SalesOrderElement) {
    this.http.post(this.apiURL + '/salesOrder/updateSalesOrder', salesOrder).subscribe(
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

  cancelSalesOrder(id: number) {
    this.http.post(this.apiURL + '/salesOrder/cancelSalesOrder', id).subscribe(
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
  
  getStock(): Observable<Stock[]> {
    return this.http.get<Stock[]>(this.apiURL + '/stock')
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  getFlower(): Observable<Flower[]> {
    return this.http.get<Flower[]>(this.apiURL + '/flower/getAll')
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  deleteStock(stock: DeleteStock[]): Observable<any> {
    return this.http.post(this.apiURL + '/stock/deleteStock', stock, { observe: 'response'});
  }

  addStock(stock: AddStock): Observable<any> {
    return this.http.post(this.apiURL + '/stock/addStock', stock, { observe: 'response'});
  }

  handleError(error: HttpErrorResponse) {
    window.alert(error.error);
    return throwError(error.message);
  }
}