import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const userToken = localStorage.getItem('token'); 
  const exclude = /^some_url\/\d+$/;

  if (exclude.test(req.url)) {
    const modifiedReq = req.clone({
      headers: req.headers.set('x-api-key', ``)
    });
    return next(modifiedReq);
  }
  else{
  const modifiedReq = req.clone({
    headers: req.headers.set('Authorization', `${userToken}`)
    .set('X-Not-A-Browser', 'true')
  });
  return next(modifiedReq);
}
};

