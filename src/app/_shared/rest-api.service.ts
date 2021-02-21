import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { FlowerFormula } from '../interface/flower-formula'
import { SearchFlowerFomularResult } from '../interface/searchFlowerFomularResult';
import { searchFlowerFomularResult } from '../searchflower/searchflower.component';

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

  getFlowerFormula(): Observable<FlowerFormula> {
    return this.http.get<FlowerFormula>(this.apiURL + '/flowerformula')
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

  searchFlowerFormula(searchFlowerForm: any): Observable<FlowerFormula[]> {
    return this.http.get<FlowerFormula[]>(this.apiURL + '/flowerFormula/search')
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  handleError(error: { error: { message: string; }; }) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = 'Error Code: ${error.status}]nMessage: ${error.message}';
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}