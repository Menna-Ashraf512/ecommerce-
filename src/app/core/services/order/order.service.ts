import { HttpClient } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  myToken = localStorage.getItem('userToken')!;
  endPoint='/api/v1/orders/'
  // dataShipping:WritableSignal<Ishipping>= signal<Ishipping>({} as Ishipping)
  
  constructor(private readonly _httpClient: HttpClient) {}

  checkOutSession(id: string, data: object): Observable<any> {
    return this._httpClient.post(
      `${environment.baseUrl}${this.endPoint}checkout-session/${id}?url=http://localhost:4200`,
      {
        shippingAddress: data,
      }
    );

  }

  checkOutCash(id: string, data: object): Observable<any> {
    return this._httpClient.post(
      `${environment.baseUrl}${this.endPoint}${id}`,
      {
        shippingAddress: data,
      }
    );

  }

  getAllOrder():Observable<any>{
    return this._httpClient.get(`${environment.baseUrl}${this.endPoint}`)
  }

  getUserOrders(id:string):Observable<any>{
    return this._httpClient.get(`${environment.baseUrl}${this.endPoint}user/${id}`)
  }

}
