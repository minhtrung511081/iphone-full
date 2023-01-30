import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import {Observable} from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) {
  }
  httpHeaders = new HttpHeaders({'Content-Type': 'application/json',
});
  getHttpOptions() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
  }
  registerUser(userData):Observable<any>{
    return this.http.post('http://127.0.0.1:8000/account/registerAccount/', JSON.stringify(userData), {headers: this.httpHeaders})
  }
}
