import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

export const errorsInterceptor: HttpInterceptorFn = (req, next) => {

  const _toastrService=inject(ToastrService)
  //logic REQ
  
  return next(req).pipe(catchError( (err)=>{

    //logic error
    _toastrService.error(err.error.message, 'MegaCart')
    
    return throwError( ()=> err)
  } )); //logic RES

};


