import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpParams
} from '@angular/common/http';
import { take, exhaustMap, map } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { AuthService } from './auth.service';
import * as fromApp from '../store/app.reducer';
@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService, private store: Store<fromApp.AppState>) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    //I don't want to take entire state, just user from inside this selected observable
    return this.store.select('auth').pipe(
      take(1),
      //extra step before continue with the user : for now we have object with user property
      map(authState => {
        return authState.user;
      }),
      exhaustMap(user => {
        //we have user here, so we can return next handle request and edit the request based on the user
        //adding check - if we don't have any user return unmodified request, no token there
        if (!user) {
          return next.handle(req);
        }
        const modifiedReq = req.clone({
          // if the initial value is null, we try to get token of null, request fails and does not even get send
          params: new HttpParams().set('auth', user.token)
        });
        return next.handle(modifiedReq);
      })
    );
    //with this code interceptor sholud add token to all outgoing requests. Don't forget provide in appmodule!

  }
}
