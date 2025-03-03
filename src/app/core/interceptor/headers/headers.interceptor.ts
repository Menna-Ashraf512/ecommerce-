import { HttpInterceptorFn } from '@angular/common/http';

export const headersInterceptor: HttpInterceptorFn = (req, next) => {
  const userToken = localStorage.getItem('userToken') !; 
  const lang = localStorage.getItem('lang') ?? 'en'; 

  if (userToken) {
    if (req.url.includes('cart') || req.url.includes('orders') || req.url.includes('wishlist')|| req.url.includes('allorders')|| req.url.includes('')) {
      req = req.clone({
        setHeaders: {
          token: userToken,
          lang: lang
        },
      });
    }
  }


  
  return next(req);
};
