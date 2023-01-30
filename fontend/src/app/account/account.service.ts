import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {UserService} from '../user.service';
@Injectable({
  providedIn: 'root'
})
export class AccountService {

  // httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  constructor(private http: HttpClient,public _userService: UserService) { }

  getAllMovies(): Observable<any> {
    return this.http.get('http://127.0.0.1:8000/account/accountList/',
    this.getHttpOptions());
    // {headers: this.httpHeaders});
  }

  getOneMovie(id): Observable<any> {
    return this.http.get('http://127.0.0.1:8000/account/optionsAccountListAdmin/' + id + '/',
     this.getHttpOptions()
    // {headers: this.httpHeaders}
   
    );
    console.log(id)
  }

  updateMovie(movie): Observable<any> {
    const body = {id: movie.id , username: movie.username , is_superuser: movie.is_superuser, first_name:movie.first_name, last_name:movie.last_name , is_staff: movie.is_staff , email: movie.email , phone: movie.phone , address: movie.address };
    return this.http.put('http://127.0.0.1:8000/account/optionsAccountListAdmin/' + movie.id + '/', JSON.stringify(body), this.getHttpOptions()
    // {headers: this.httpHeaders}
    );
  }
  createMovie(movie): Observable<any> {
    const body = {id: movie.id , username: movie.username , is_superuser: movie.is_superuser, first_name:movie.first_name, last_name:movie.last_name , is_staff: movie.is_staff , email: movie.email , phone: movie.phone , address: movie.address};
    return this.http.post('http://localhost:8000/account/registerAccount/', body,
    // {headers: this.httpHeaders}
    );
  }
  deleteMovie(id): Observable<any> {
    return this.http.delete('http://127.0.0.1:8000/account/optionsAccountListAdmin/' + id + '/',
    // {headers: this.httpHeaders}
    );
  }

  //thong bao

  getAllThongbao(): Observable<any> {
    return this.http.get('http://127.0.0.1:8000/account/thongbaoList/',
    // {headers: this.httpHeaders}
    );
  }

  getOneThongbao(id): Observable<any> {
    return this.http.get('http://127.0.0.1:8000/account/objectThongbao/' + id + '/',
    // {headers: this.httpHeaders}
    );
  }

  updateThongbao(tb): Observable<any> {
    const body = {id: tb.id , noidung: tb.noidung , trangthai: tb.trangthai};
    return this.http.put('http://127.0.0.1:8000/account/objectThongbao/' + tb.id + '/', body,
    // {headers: this.httpHeaders}
    );
  }
  createThongbao(tb): Observable<any> {
    const body = {noidung: tb.noidung, trangthai: tb.trangthai };
    return this.http.post('http://localhost:8000/account/thongbaoList/', body,
    // {headers: this.httpHeaders}
    );
  }
  deleteThongbao(id): Observable<any> {
    return this.http.delete('http://127.0.0.1:8000/account/objectThongbao/' + id + '/',
    // {headers: this.httpHeaders}
    );
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
