import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {} from '@angular/common/'
import {UserService} from '../user.service';
@Injectable({
    providedIn: 'root'
  })
  export class PhieunhapService {
  
     httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  
    constructor(private http: HttpClient,public _userService: UserService) { }
  
    getallP(): Observable<any> {
      return this.http.get('http://127.0.0.1:8000/nhaphang/SalesInvoicesListget/',
      {headers: this.httpHeaders});
    }

    getallS(): Observable<any> {
      return this.http.get('http://127.0.0.1:8000/nhaphang/SourceInputList/',
      {headers: this.httpHeaders});
    }

    getOneP(id): Observable<any> {
      return this.http.get('http://127.0.0.1:8000/nhaphang/DetailedSalesInvoices/' + id + '/',
      {headers: this.httpHeaders});
    }
  
    updateP(p): Observable<any> {
      const body = {id: p.id ,nguonnhap:p.nguonnhap};
      return this.http.put('http://127.0.0.1:8000/nhaphang/DetailedSalesInvoices/' + p.id + '/', body,
      {headers: this.httpHeaders});
    }

    createP(p): Observable<any> {
      const body = {nguonnhap:p.nguonnhap};
      return this.http.post('http://127.0.0.1:8000/nhaphang/SalesInvoicesList/', JSON.stringify(body),this.getHttpOptions()
      // {headers: this.httpHeaders}
      );
    }
    deletectpn(id): Observable<any> {
      return this.http.delete('http://127.0.0.1:8000/nhaphang/DetailedSalesCart/' + id + '/',
      {headers: this.httpHeaders});
    }

    updatectpn(p): Observable<any> {
      const body = {id: p.id ,soluong:p.soluong,sanpham:p.sanpham,phieunhap:p.phieunhap,gia:p.gia};
      return this.http.put('http://127.0.0.1:8000/nhaphang/DetailedSalesCart/' + p.id + '/', body,
      {headers: this.httpHeaders});
    }

    deleteP(id): Observable<any> {
      return this.http.delete('http://127.0.0.1:8000/nhaphang/DetailedSalesInvoices/' + id + '/',
      {headers: this.httpHeaders});
    }

    getOnectpn1(id): Observable<any> {
      return this.http.get('http://127.0.0.1:8000/nhaphang/ctpnobjget/' + id + '/',
      );
    }
    
    createCtpn(id, a): Observable<any> {
      const body = {soluong:a.soluong, sanpham:a.sanpham};
      console.log(this.getHttpOptions())
      return this.http.post('http://127.0.0.1:8000/nhaphang/addSalesCart/' + id + '/',JSON.stringify(body),this.getHttpOptions());
    }

    getOnectpn(id): Observable<any> {
      return this.http.get('http://127.0.0.1:8000/nhaphang/DetailedSalesCart/' + id + '/',
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
  