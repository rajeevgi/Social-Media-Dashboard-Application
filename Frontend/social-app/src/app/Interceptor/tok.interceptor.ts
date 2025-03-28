import { HttpInterceptorFn } from '@angular/common/http';

export const tokInterceptor: HttpInterceptorFn = (req, next) => {

  const token = localStorage.getItem('token');

    const modifiedReq = req.clone({
      setHeaders: {
        Authorization : token ? `Bearer ${token}` : ' '
      },
      withCredentials: true
    });
    return next(modifiedReq);
};
