import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';

export interface AuthResponseData {
  kind?: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  //we want to store authenticated user as a subject, always changes when authentication status changes(even if the token expires, the user subject will emit new value - null)
  user = new BehaviorSubject<User>(null);
  //way of accessing token on demand- not subcject( i am not interesting on every change)
  // token: string = null; <- not bad, but we have better way - different 'BehaviourSubject'
  //we can next to emit new value and subscribe to be informed
  //diff: give access to the previous emitted value, even if we were not subscribing it earlier
  // We can get access to the currently active user, even if we only subscribe after user has been emitted. Need to be initialized with starting value
  private tokenExpirationTimer: any;


  constructor(private http: HttpClient, private router: Router) { }

  signup(email: string, password: string) {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAwtW5dbaE2t0ha5dD3Rcg8_keDFLoGQn0', {
      email: email,
      password: password,
      returnSecureToken: true
      //tap allows us to make some actions without changing the response
    }).pipe(catchError(this.handleError), tap(
      resData => {
        //calling handleAuth with all the data this function needs
        this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
      }
    ));
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAwtW5dbaE2t0ha5dD3Rcg8_keDFLoGQn0', {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(catchError(this.handleError), tap(
      resData => {
        this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
      }
    ));
  }

  autoLogin() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }
    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate));

    // only truish if its a valid token - exp date in the future
    if (loadedUser.token) {
      //emit loaded user as currently active user
      this.user.next(loadedUser);
      //also call autologout - but here we need to calculate remaining time
      const expirationDuration =
        new Date(userData._tokenExpirationDate).getTime() -
        new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
    //or clear();, but clear will remove all stored data
    localStorage.removeItem('userData');
    //check if we do have active timer - then clear it
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }
  //we need to know when to envalidate token
  //expDur - amount of milisecond until token is invalid
  //automatically logout after expirationDuration time
  //manually logout - clear the timer!
  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration)
  }

  //WE CALL HANDLEAUTHENTICATION, WE FORWARD ALL THE DATA,
  //WE USING DATA IN HANDLEAUTHENTICATION TO CREATE NEW USER AND LOG HIM IN

  // like handle error - make everything what we need related to authentication
  private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
    //new JS object based on expiresIn time which we get in response - in seconds
    //getTime - entire timestamp in miliseconds since the beggining of time in JS (1970)
    //expiresIn - in seconds (we need to * 1000), make number from string
    //wrapping with newDate() - converting back in Date object timestamp
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email already exists.';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email does not exist.';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'This password is not correct.';
        break;
    }
    return throwError(errorMessage);
  }
}

