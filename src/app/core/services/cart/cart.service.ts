import { HttpClient } from '@angular/common/http';
import { effect, Injectable, signal, WritableSignal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  myToken= localStorage.getItem('userToken')!
  cartNumber:WritableSignal<number>= signal(0)
  
  constructor(private readonly _httpClient:HttpClient) { 

    effect( ()=>{

      localStorage.setItem("cartCount", this.cartNumber().toString())
    } )
  }
  
  
  //add product to cart
  addProductToCart(id:string):Observable<any>{

    return this._httpClient.post(`${environment.baseUrl}/api/v1/cart`,
      {
      "productId": id
      }
    )
  }

  getLoggedUserCart():Observable<any>{

    return this._httpClient.get(`${environment.baseUrl}/api/v1/cart`)
  }


  removeSpecificCardItem(id:string):Observable<any>{
    return this._httpClient.delete(`${environment.baseUrl}/api/v1/cart/${id}`
  )
  }


  updateCartProduct(id:string,newCount:number):Observable<any>{
    return this._httpClient.put(`${environment.baseUrl}/api/v1/cart/${id}`,
      {
        "count":newCount
      }
    )
  }


  clearCart():Observable<any>{
    return this._httpClient.delete(`${environment.baseUrl}/api/v1/cart`)
  }
  
}
