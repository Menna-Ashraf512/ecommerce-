import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../core/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private readonly _httpClient:HttpClient) { }

  getProduct():Observable<any>{
   return this._httpClient.get(`${environment.baseUrl}/api/v1/products`)
  }
  getSpecificProducts(id:string|null):Observable<any>{
    return this._httpClient.get(`${environment.baseUrl}/api/v1/products/${id}`)
  }
}
