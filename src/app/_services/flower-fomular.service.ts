import { Injectable } from '@angular/core';
import { FlowerFomular } from '../_models/flower-fomular';
import {HttpClientModule} from '@angular/common/http';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FlowerFomularService {

  //private baseUrl = "http://localhost:8080/SearchFieldExample/api/";  
  http: any;
 // constructor(http : Http) { }  

  getData(FlowerFomular : FlowerFomular)  
  {  let url = "filterData"
    //let url = this.baseUrl + "filterData";  
    return  this.http.post(url , FlowerFomular);  
  }  
}
