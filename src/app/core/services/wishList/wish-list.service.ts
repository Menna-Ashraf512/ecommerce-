import { HttpClient } from '@angular/common/http';
import { effect, Injectable, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class WishListService {

  wishNumber:WritableSignal<number>= signal(0)

  constructor(private readonly _httpClient:HttpClient) { 
  }

    addProductToWishList(id:string):Observable<any>{
      return this._httpClient.post(`${environment.baseUrl}/api/v1/wishlist`,
        {
        "productId": id
        }
      )
    }
  
    getLoggedUserWishList():Observable<any>{
  
      return this._httpClient.get(`${environment.baseUrl}/api/v1/wishlist`)
    }
  
  
    removeSpecificFromWishList(id:string):Observable<any>{
      return this._httpClient.delete(`${environment.baseUrl}/api/v1/wishlist/${id}`
    )
    }


}
