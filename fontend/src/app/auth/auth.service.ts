import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import {UserService} from '../user.service'
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public jwtHelper: JwtHelperService, public _user: UserService) { }

  public isAuthenticated(): boolean {
    // once the user logined, we have store our access token on localstorage for
    // future operations.
    // Here we are validating jwt token(response access) with help of jwtHelper
    // Don't foreget to enable the JwtHelperService in the app.module.ts
    // Here I'm using angualr-jwt for the handle and verify the jwt token

    // return true
    const token = localStorage.getItem('token');
    return !!token;
    // return token != null && !this.jwtHelper.isTokenExpired(token);
    // const token = this._user.token
    // return !this.jwtHelper.isTokenExpired(token);
    // if (token == '') {return false;}
    // else return true
    // return true
    
  }

}
