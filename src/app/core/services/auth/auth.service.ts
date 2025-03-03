import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environment/environment';
import {jwtDecode} from '../../../../../node_modules/jwt-decode'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData:BehaviorSubject<any>= new BehaviorSubject(null)
  private readonly _router = inject(Router)

  constructor(private readonly _httpClient:HttpClient) { }

  sendRegisterForm(data:object):Observable<any>{ 
   return this._httpClient.post(`${environment.baseUrl}/api/v1/auth/signup`,data )
  }
  sendLoginForm(data:object):Observable<any>{
    return this._httpClient.post(`${environment.baseUrl}/api/v1/auth/signin`,data )
   }

   saveUserData():void{
    if(localStorage.getItem('userToken')!== null){
     this.userData.next(jwtDecode(localStorage.getItem('userToken') ! ))
     console.log('userData',this.userData);
    }

  }


  logOut():void{
    localStorage.removeItem('userToken');
    // navigate login
    this._router.navigate(['/login'])
  }

  setEmailVerify(data:object):Observable<any>{
    return this._httpClient.post(`${environment.baseUrl}/api/v1/auth/forgotPasswords`,data)
  }

  setCodeVerify(data:object):Observable<any>{
    return this._httpClient.post(`${environment.baseUrl}/api/v1/auth/verifyResetCode`,data)
  }
  setResetPass(data:object):Observable<any>{
    return this._httpClient.put(`${environment.baseUrl}/api/v1/auth/resetPassword`,data)
  }

}


  

