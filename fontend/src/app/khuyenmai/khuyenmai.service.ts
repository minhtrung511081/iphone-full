import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {} from '@angular/common/'

@Injectable({
    providedIn: 'root'
  })
  export class KhuyenmaiService {
  
     httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  
    constructor(private http: HttpClient) { }
  
    getallKm(): Observable<any> {
      return this.http.get('http://127.0.0.1:8000/sanpham/khuyenmai/',
      {headers: this.httpHeaders});
    }

    getOneKm(id): Observable<any> {
      return this.http.get('http://127.0.0.1:8000/sanpham/objkhuyenmai/' + id + '/',
      {headers: this.httpHeaders});
    }
  
    updateKm(km): Observable<any> {
      const body = {id: km.id , ma: km.ma, ten:km.ten, giatri:km.giatri, ngaybd:km.ngaybd, ngaykt:km.ngaykt, ngaytao:km.ngaytao };
      return this.http.put('http://127.0.0.1:8000/sanpham/objkhuyenmai/' + km.id + '/', body,
      {headers: this.httpHeaders});
    }

    createKm(km): Observable<any> {
      const body = {ma: km.ma, ten:km.ten, giatri:km.giatri, ngaybd:km.ngaybd, ngaykt:km.ngaykt};
      // , ngaytao:km.ngaytao
      return this.http.post('http://127.0.0.1:8000/sanpham/khuyenmai/', body,
      {headers: this.httpHeaders});
    }
    deleteKm(id): Observable<any> {
      return this.http.delete('http://127.0.0.1:8000/sanpham/objkhuyenmai/' + id + '/',
      {headers: this.httpHeaders});
    }
  }
  