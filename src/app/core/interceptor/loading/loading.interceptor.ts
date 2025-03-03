import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const _ngxSpinnerService=inject(NgxSpinnerService)
  
  //req show
  // if(req.url.includes('product')){
  _ngxSpinnerService.show()
  // }

  return next(req).pipe(finalize( ()=>{
    _ngxSpinnerService.hide()
  } ))
};
 