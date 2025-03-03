import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../core/environment/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  endPoint='/api/v1/categories'
  constructor(private readonly _httpClient:HttpClient) { }

  getAllSubCategories():Observable<any>{
     return this._httpClient.get(`${environment.baseUrl}${this.endPoint}`)
  }

  getSpecificSubCategory(id:string):Observable<any>{
    return this._httpClient.get(`${environment.baseUrl}${this.endPoint}${id}}`)
  }

}
