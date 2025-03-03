import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../core/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  endPoint='/api/v1/brands/'


  constructor(private readonly _httpClient:HttpClient) { 
  }


    getAllBrands():Observable<any>{
      return this._httpClient.get(`${environment.baseUrl}${this.endPoint}`)
    }

    getSpecificBrand(id:string):Observable<any>{
      return this._httpClient.get(`${environment.baseUrl}${this.endPoint}${id}`)
    }

  
}
