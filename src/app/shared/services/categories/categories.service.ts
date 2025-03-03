import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService{


  constructor(private readonly __httpClient:HttpClient) { }

  getAllCategories():Observable<any>{
   return this.__httpClient.get(`https://ecommerce.routemisr.com/api/v1/categories`)
  }
}
