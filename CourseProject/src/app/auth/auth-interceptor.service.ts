import { Injectable } from '@angular/core';
import { HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from '@angular/common/http';
import { AuthService } from './auth.service';
import { take, exhaustMap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.authService.user.pipe(
      take(1),
      exhaustMap(user => {
        //we have user here, so we can return next handle request and edit the request based on the user
        //adding check - if we don't have any user return unmodified request, no token there
        if (!user) { return next.handle(req) }
        const modifiedReq = req.clone({
          // if the initial value is null, we try to get token of null, request fails and does not even get send
          params: new HttpParams().set('auth', user.token)
        });
        return next.handle(modifiedReq);
      }));
    //with this code interceptor sholud add token to all outgoing requests. Don't forget provide in appmodule!

  }
}
