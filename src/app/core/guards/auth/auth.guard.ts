import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { jwtDecode } from '../../../../../node_modules/jwt-decode';

export const authGuard: CanActivateFn = (route, state) => {
  let _router = inject(Router);
  const id = inject(PLATFORM_ID);
  if (isPlatformBrowser(id)) {
    const userToken = localStorage.getItem('userToken')!;
    localStorage.setItem('userId',(jwtDecode(userToken)as{id:string}).id)
    jwtDecode(userToken);
    if (userToken) {
      return true;
    }else{
      _router.navigate(['/login']);
      return false;
    }
  } else {
    return false;
  }
};
