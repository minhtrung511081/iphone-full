import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class UserService {
   // http options used for making API calls
   private httpOptions: any;
 
   // the actual JWT token
   public token: string;
  
   // the token expiration date
   public token_expires: Date;
  
   // the username of the logged in user
   public username: string;
  
   // error messages received from the login attempt
   public errors: any = [];

  constructor(private http: HttpClient) { 
    this.httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
  }

   // Uses http.post() to get an auth token from djangorestframework-jwt endpoint
   public login(user) {
    this.http.post('http://127.0.0.1:8000/account/api-token-auth/', JSON.stringify(user), this.httpOptions).subscribe(
      data => {
        console.log('login success', data);
        this.updateData(data['token']);
        localStorage.setItem('token', data['token']);
      },
      err => {
        console.error('login error', err);
        this.errors = err['error'];
      }
    );
  }
 
  // Refreshes the JWT token, to extend the time the user is logged in
  public refreshToken() {
    this.http.post('http://127.0.0.1:8000/account/api-token-refresh/', JSON.stringify({token: this.token}), this.httpOptions).subscribe(
      data => {
        console.log('refresh success', data);
        this.updateData(data['token']);
      },
      err => {
        console.error('login error', err);
        this.errors = err['error'];
      } 
    );
  }
 
  public logout() {
    this.token = null;
    this.token_expires = null;
    this.username = null;
  }

  private updateData(token) {
    this.token = token;
    this.errors = [];

    // decode the token to read the username and expiration timestamp
    const token_parts = this.token.split(/\./);
    // console.log(token_parts)
    const token_decoded = JSON.parse(window.atob(token_parts[1]));
    // console.log(token_decoded)
    // console.log(window.atob(token_parts[1]))
    // console.log(token_parts[1])
    console.log(token_decoded.exp)
    this.token_expires = new Date(token_decoded.exp * 10000);
    this.username = token_decoded.username;
  }
}
