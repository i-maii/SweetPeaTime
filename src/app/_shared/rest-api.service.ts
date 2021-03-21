/// <reference types="@types/googlemaps" />
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
import { FlowerFormulaDetail } from "../interface/flower-formula-detail";
import { PromotionDetailDto } from "../interface/promotion-detail-dto";
import { PromotionDetailCurrentDto } from "../interface/promotion-detail-current-dto";
import { PriceOfOrders } from '../interface/priceOfOrders';
import { FloristDeliveryFee } from '../interface/FloristDeliveryFee';


@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  apiURL = environment.apiUrl;
  geocoder = new google.maps.Geocoder();
  florists: Florist[] = [];
  floristDeliveryFee : FloristDeliveryFee[] = [];
  customerLocation = new google.maps.LatLng(0,0);

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


  searchListSalesOrder(startDate: any, endDate: any): Observable<SalesOrderDetailListDto[]> {
    let params = new HttpParams;
    params = params.append('startDate', startDate);
    params = params.append('endDate', endDate);
    return this.http.get<SalesOrderDetailListDto[]>(this.apiURL + '/salesOrder/searchSalesOrderDetailListDto')
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
    searchFlowerForm.flowerCat? params = params.append('flowerCat', searchFlowerForm.flowerCat): '';
    searchFlowerForm.name? params = params.append('name', searchFlowerForm.name): '';
    searchFlowerForm.pattern? params = params.append('pattern', searchFlowerForm.pattern): '';
    searchFlowerForm.color? params = params.append('color', searchFlowerForm.color): '';
    searchFlowerForm.occasion? params = params.append('occasion', searchFlowerForm.occasion): '';
    searchFlowerForm.priceFrom? params = params.append('priceFrom', searchFlowerForm.priceFrom): '';
    searchFlowerForm.priceTo? params = params.append('priceTo', searchFlowerForm.priceTo): '';
    searchFlowerForm.quantityAvailable? params = params.append('quantityAvailable', searchFlowerForm.quantityAvailable): '';
    searchFlowerForm.size? params = params.append('size', searchFlowerForm.size): '';
    searchFlowerForm.florist? params = params.append('florist', searchFlowerForm.florist): '';

    return this.http.get<FlowerFormula[]>(this.apiURL + '/flowerFormula/search',{params: params})
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
        retry(0),
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

  getFlowerAvailableFromCurrentStock(formulaId: number, floristId: number, orderDate: Date): Observable<number> {
    let params = new HttpParams;
    params = params.append('formulaId', formulaId+"");
    params = params.append('floristId', floristId+"");
    params = params.append('orderDate', this.datepipe.transform(orderDate, 'yyyy-MM-dd')+"");
   // console.log(params);
    return this.http.get<number>(this.apiURL + '/flowerFormulaDetail/getFormulaDetailFromStock', {
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
  
  getSalesOrderPrice(priceOfOrders: PriceOfOrders[]): Observable<any> {
    return this.http.post<SalesOrderPrice>(this.apiURL + '/flowerFormula/priceOfSalesOrder', priceOfOrders, {observe: 'body'});
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
  
  createSalesOrder(salesOrder: SalesOrderElement): Observable<any> {
    return this.http.post(this.apiURL + '/salesOrder/createSalesOrder', salesOrder, { observe: 'response'});
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

  calculateDeliveryFee(distance :any){
    let params = new HttpParams;
   // distance = Number(distance);
    params = params.append('distance', distance);
    return this.http.get(this.apiURL + '/calculation/calculateDeliveryFee', { params: params})
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
    }).pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  calculateTotalPrice(deliveryFee :any, flowerFormulaPrice :number[] ){
    let params = new HttpParams;
    if(isNaN(deliveryFee) || deliveryFee == null )
    {
      params = params.append('deliveryFee', '0');

    }
    else
    {
    params = params.append('deliveryFee', deliveryFee.toString());
    }
    flowerFormulaPrice.forEach((price:number) => {
       params = params.append('flowerFormulaPrice[]', price.toString());
  })
    //params = params.append('florflowerFormulaPrice', flowerFormulaPrice);
    return this.http.get(this.apiURL + '/calculation/calculateTotalPrice', { params: params})
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  deleteStock(stock: DeleteStock[]): Observable<any> {
    return this.http.post(this.apiURL + '/stock/deleteStock', stock, { observe: 'response'});
  }

  addStock(stock: AddStock[]): Observable<any> {
    return this.http.post(this.apiURL + '/stock/addStock', stock, { observe: 'response'});
  }
  
  updatePromotion(promotionId: number): Observable<any> {
    console.log(promotionId);
    let params = new HttpParams;
    params = params.append('promotionId', promotionId + "");

    return this.http.post(this.apiURL + '/promotionDetail/updatePromotion?', null, {params: params, observe: 'response' });
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

  addPromotion(formulaName: string, price: number, locationName: string, profit: number, quantity: number) {    
    console.log(formulaName);
    return this.http.post(this.apiURL + '/promotionDetail/addPromotion', { 
      formulaName: formulaName, 
      price: price,
      locationName: locationName,
      profit: profit,
      quantity: quantity,
    }, 
    { observe: 'response'
    });
  }

  deg2rad(deg: number) {
    return deg * (Math.PI / 180)
  }

  calculateDistance(address: string, floristId: any) {

    if (address!='')
    {
      this.floristDeliveryFee = [];
        //find customer location latlang 
        this.geocoder.geocode({ 'address' : address }, (cusAddress, status) => {
          if (status === "OK") {
          if(cusAddress != null)
         { this.customerLocation = cusAddress[0].geometry.location;}
          }
          else
          {
              alert("Geocode was not successful for the following reason: " + status);
          }

        });
        //find all florist
        this.getFlorist().subscribe((data: Florist[]) => {
          for (let i = 0; i < data.length; i++) {
        
            let floristDeliveryFeeResult: {
              id: number,
              floristId: number,
              name: string,
              address: string,
              location: google.maps.LatLng,
              distance : number,
              deliveryFee: number,
            } = 
            {
              id: 0,
              floristId: 0,
              name: '',
              address: '',
              location: new google.maps.LatLng(0, 0),
              distance: 0,
              deliveryFee: 0,
            };
            floristDeliveryFeeResult.floristId = data[i].id;
            floristDeliveryFeeResult.address = data[i].address;
            floristDeliveryFeeResult.name = data[i].name;
            this.floristDeliveryFee.push(floristDeliveryFeeResult); 
          }//End for all florists
       

        //find florist location

        for (let j=0 ;j < this.floristDeliveryFee.length ; j++)
        {
        this.geocoder.geocode({ 'address' : this.floristDeliveryFee[j].address }, (results, status) => {
          if (status === "OK") {
            if(results != null)
            {
              this.floristDeliveryFee[j].location = results[0].geometry.location;
            }
          } else {
            alert("Geocode was not successful for the following reason: " + status);
          }
        });//End find florist location 
        }
        //calculatedistance
        for (let i=0 ;i < this.floristDeliveryFee.length ; i++)
        {
        let R = 6371; // Radius of the earth in km
        let dLat = this.deg2rad(this.customerLocation.lat() - this.floristDeliveryFee[i].location.lat());  // deg2rad below
        let dLng = this.deg2rad(this.customerLocation.lng() - this.floristDeliveryFee[i].location.lng()); 
        let a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(this.deg2rad(this.floristDeliveryFee[i].location.lat())) * Math.cos(this.deg2rad(this.customerLocation.lat() )) *
          Math.sin(dLng / 2) * Math.sin(dLng / 2)
          ;
        let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        let d = R * c; // Distance in km
        //use 'd' for distance
        console.log('distance: ', d);
        this.floristDeliveryFee[i].distance = Math.round(d);
        //floristDeliveryFeeResult.
      }

        for (let i = 0; i < this.floristDeliveryFee.length; i++) {

        this.calculateDeliveryFee(this.floristDeliveryFee[i].distance).subscribe((deliveryFeeResult) => {
            
          this.floristDeliveryFee[i].deliveryFee = Number(deliveryFeeResult);
          if(isNaN(this.floristDeliveryFee[i].deliveryFee))
          {
            this.floristDeliveryFee[i].deliveryFee = 0;
          }
        }) //End calculate fee
      }//end for this.floristDeliveryFee 
    });//End get all florist
}//end address != null
  
return this.floristDeliveryFee;
}


calculateDeliveryFeeByFloristId(address: string, floristId: any) {

  if (address!='')
  {
    this.floristDeliveryFee = [];
      //find customer location latlang 
      this.geocoder.geocode({ 'address' : address }, (cusAddress, status) => {
        if(cusAddress != null)
       { this.customerLocation = cusAddress[0].geometry.location;}
      });
      //find all florist
      this.getFlorist().subscribe((data: Florist[]) => {
        for (let i = 0; i < data.length; i++) {
      
          let floristDeliveryFeeResult: {
            id: number,
            floristId: number,
            name: string,
            address: string,
            location: google.maps.LatLng,
            distance : number,
            deliveryFee: number,
          } = 
          {
            id: 0,
            floristId: 0,
            name: '',
            address: '',
            location: new google.maps.LatLng(0, 0),
            distance: 0,
            deliveryFee: 0,
          };
          floristDeliveryFeeResult.floristId = data[i].id;
          floristDeliveryFeeResult.address = data[i].address;
          floristDeliveryFeeResult.name = data[i].name;
          this.floristDeliveryFee.push(floristDeliveryFeeResult); 
        }//End for all florists
      });//End get all florist

      //find florist location
      for (let j=0 ;j < this.floristDeliveryFee.length ; j++)
      {
      this.geocoder.geocode({ 'address' : this.floristDeliveryFee[j].address }, (results, status) => {
        if(results != null)
        {
          this.floristDeliveryFee[j].location = results[0].geometry.location;
        }
      });//End find florist location 
      }
      //calculatedistance
      for (let i=0 ;i < this.floristDeliveryFee.length ; i++)
      {
      let R = 6371; // Radius of the earth in km
      let dLat = this.deg2rad(this.customerLocation.lat() - this.floristDeliveryFee[i].location.lat());  // deg2rad below
      let dLng = this.deg2rad(this.customerLocation.lng() - this.floristDeliveryFee[i].location.lng()); 
      let a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(this.deg2rad(this.floristDeliveryFee[i].location.lat())) * Math.cos(this.deg2rad(this.customerLocation.lat() )) *
        Math.sin(dLng / 2) * Math.sin(dLng / 2)
        ;
      let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      let d = R * c; // Distance in km
      //use 'd' for distance
      console.log('distance: ', d);
      this.floristDeliveryFee[i].distance = Math.round(d);
      //floristDeliveryFeeResult.
    }

      for (let i = 0; i < this.floristDeliveryFee.length; i++) {

      this.calculateDeliveryFee(this.floristDeliveryFee[i].distance).subscribe((deliveryFeeResult) => {
          
        this.floristDeliveryFee[i].deliveryFee = Number(deliveryFeeResult);
        if(isNaN(this.floristDeliveryFee[i].deliveryFee))
        {
          this.floristDeliveryFee[i].deliveryFee = 0;
        }
      }) //End calculate fee
    }//end for this.floristDeliveryFee 
}//end address != null

return this.floristDeliveryFee;
}


  handleError(error: HttpErrorResponse) {
    window.alert(error.error);
    return throwError(error.message);
  }
}