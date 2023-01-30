import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {UserService} from '../user.service';
@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(
    private http: HttpClient,public _userService: UserService
  ) { }

  getaccount(): Observable<any> {
    return this.http.get('http://127.0.0.1:8000/account/accountList/',
    this.getHttpOptions());
    // {headers: this.httpHeaders});
  }

  getHttpOptions() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + this._userService.token
      })
    };
  }

}
