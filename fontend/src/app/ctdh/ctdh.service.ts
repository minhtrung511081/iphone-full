import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
    providedIn: 'root'
  })
  export class CtdhService {
  
     httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  
    constructor(private http: HttpClient) { }
  
    getallCtdh(): Observable<any> {
      return this.http.get('http://127.0.0.1:8000/purchase/PurchaseInvoiceDetailsList/',
      {headers: this.httpHeaders});
    }

    getOneCtdh(id): Observable<any> {
      return this.http.get('http://127.0.0.1:8000/purchase/DetailedPurchaseInvoiceDetails/' + id + '/',
      {headers: this.httpHeaders});
    }

    getctdhsp(id): Observable<any> {
      return this.http.get('http://127.0.0.1:8000/statistic/ctdh/' + id + '/',
      {headers: this.httpHeaders});
    }
  
    updateCtdh(ct): Observable<any> {
      const body = {id: ct.id , soluong: ct.soluong, sanpham:ct.sanpham, donhang:ct.donhang};
      return this.http.put('http://127.0.0.1:8000/purchase/DetailedPurchaseInvoiceDetails/' + ct.id + '/', body,
      {headers: this.httpHeaders});
    }
    createCtdh(ct): Observable<any> {
      const body = {soluong: ct.soluong, sanpham:ct.sanpham, donhang:ct.donhang};
      return this.http.post('http://127.0.0.1:8000/purchase/PurchaseInvoiceDetailsList/', body,
      {headers: this.httpHeaders});
    }
    deleteCtdh(id): Observable<any> {
      return this.http.delete('http://127.0.0.1:8000/purchase/DetailedPurchaseInvoiceDetails/' + id + '/',
      {headers: this.httpHeaders});
    }
    
  }
  