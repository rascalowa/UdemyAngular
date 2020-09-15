import { tokenName } from '@angular/compiler'

export class User {
  constructor(public email: string, public id: string, private _token: string, private _tokenExpirationDate: Date) { }

  //getter is a special type of property: we can write code that runs when we try to access that property. User can't overwrite getter(thats what is setter for)
  get token() {
    //check if the tokenExpDate does not exist or if the current Date is greater than TokenExpDate - then return null(if the tokenExpDate is smaller, then it is in the past, it is not valid anymore)
    if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
      return null;
    }
    // otherwise return token
    return this._token;
  }

}

