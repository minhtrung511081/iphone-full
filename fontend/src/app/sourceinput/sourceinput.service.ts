import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {} from '@angular/common/'


@Injectable({
    providedIn: 'root'
  })
  export class SourceinputService {
  
     httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  
    constructor(private http: HttpClient) { }
  
    getallS(): Observable<any> {
      return this.http.get('http://127.0.0.1:8000/nhaphang/SourceInputList/',
      {headers: this.httpHeaders});
    }

    getOneS(id): Observable<any> {
      return this.http.get('http://127.0.0.1:8000/nhaphang/DetailedSourceInput/' + id + '/',
      {headers: this.httpHeaders});
    }
  
    updateS(s): Observable<any> {
      const body = {id: s.id , name: s.name, email:s.email, address:s.address, phone:s.phone};
      return this.http.put('http://127.0.0.1:8000/nhaphang/DetailedSourceInput/' + s.id + '/', body,
      {headers: this.httpHeaders});
    }

    createS(s): Observable<any> {
      const body = {name: s.name, email:s.email, address:s.address, phone:s.phone};
      return this.http.post('http://127.0.0.1:8000/nhaphang/SourceInputList/', body,
      {headers: this.httpHeaders});
    }
    deleteS(id): Observable<any> {
      return this.http.delete('http://127.0.0.1:8000/nhaphang/DetailedSourceInput/' + id + '/',
      {headers: this.httpHeaders});
    }
  }