import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {UserService} from '../user.service';

@Injectable({
  providedIn: 'root'
})
export class StatisticService {
  httpHeaders = new HttpHeaders({'Content-Type': 'application/json',
});

  constructor(private http: HttpClient, public _userService: UserService) { }

  getql(id): Observable<any> {
    // const body = {loai:a.loai};

    // body: JSON.stringify({"loai":"iphone 11"})
    // const body = JSON.stringify({
    //   {loai:a.loai},
    // });
    return this.http.get('http://127.0.0.1:8000/statistic/manageCategories/'+ id + '/', this.getHttpOptions());
  }

  getaddS(id): Observable<any> {
    return this.http.get('http://127.0.0.1:8000/statistic/order/'+ id + '/', this.getHttpOptions());
  }

  getnhapS(id): Observable<any> {
    return this.http.get('http://127.0.0.1:8000/statistic/put/'+ id + '/', this.getHttpOptions());
  }

  getloai(): Observable<any> {
    return this.http.get('http://127.0.0.1:8000/sanpham/loai/',
    {headers: this.httpHeaders});
  }

  getallhd(): Observable<any> {
    return this.http.get('http://127.0.0.1:8000/purchase/donhanglist/', this.getHttpOptions()
   );
  }

  getallsp(): Observable<any> {
    return this.http.get('http://127.0.0.1:8000/sanpham/sanpham/', this.getHttpOptions()
   );
  }

  getthongke(id): Observable<any> {
    return this.http.get('http://127.0.0.1:8000/statistic/statistics/'+ id + '/', this.getHttpOptions()
   );
  }

  getthongkeall(id): Observable<any> {
    return this.http.get('http://127.0.0.1:8000/statistic/total/'+ id + '/', this.getHttpOptions()
   );
  }


  getHttpOptions() {
    return {  
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + this._userService.token,
      })
    };
  }
}
