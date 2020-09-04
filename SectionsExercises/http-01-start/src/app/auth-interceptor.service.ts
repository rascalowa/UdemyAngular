import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';

export class AuthInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // //code which will be runned right before request leaves our app
    // console.log('Request is on its way');
    // //way to change immutable, read-only req property
    // console.log(req.url);
    const modifiedRequest = req.clone({
      headers: req.headers.append('Auth', 'xyz')
    });
    //object with important method which will allow us to let the request continue its journey, it really needs to be returned
    return next.handle(modifiedRequest)
    // .pipe(
    //   tap(event => {
    //     console.log(event);
    //     if (event.type === HttpEventType.Response) {
    //       console.log('Response arrived, body data: ');
    //       console.log(event.body);
    //     }
    //   })
    // );
  }
}
