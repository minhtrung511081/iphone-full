import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Sanpham} from './sanpham.models'
import {SanPhamModelServer} from '../models/product.model'
@Injectable({
  providedIn: 'root'
})
export class SanphamService {
  formData: Sanpham;
  httpHeaders = new HttpHeaders({'Content-Type': 'application/json',
});
  constructor(private http: HttpClient) { }

  getAllMovies(): Observable<any> {
    
    return this.http.get('http://127.0.0.1:8000/sanpham/sanpham/',
    {headers: this.httpHeaders});

  }

  getSanphamByID(id:number):any {
    return this.http.get('http://127.0.0.1:8000/sanpham/hinhanh1/' +id+'/',
    // .toPromise();
    {headers: this.httpHeaders});
  }

  getSingleProduct(id: number): Observable<SanPhamModelServer> {
    return this.http.get<SanPhamModelServer>('http://127.0.0.1:8000/sanpham/objectsp/' + id+'/',
    // .toPromise();
    {headers: this.httpHeaders});
  } 

  getOnesp(id): Observable<any> {
    return this.http.get('http://127.0.0.1:8000/sanpham/objectsp/' + id + '/',
    {headers: this.httpHeaders});
  }

  getspctdh(id): Observable<any> {
    return this.http.get('http://127.0.0.1:8000/sanpham/spctdh/' + id + '/',
    {headers: this.httpHeaders});
  }

  getOnespno(id): Observable<any> {
    return this.http.get('http://127.0.0.1:8000/sanpham/obj/' + id + '/',
    {headers: this.httpHeaders});
  }

  getOnesp1(): Observable<any> {
    return this.http.get('http://127.0.0.1:8000/sanpham/objectsp/' + 9 + '/',
    {headers: this.httpHeaders});
  }

  updatesp(sp): Observable<any> {
    const body = {
    id: sp.id , 
    ten: sp.ten,
    giagoc: sp.giagoc, 
    manhinh: sp.manhinh, 
    chip: sp.chip,
     ram: sp.ram,
     bonhotrong: sp.bonhotrong,
     camerasau:sp.camerasau,
     cameratruoc:sp.cameratruoc,
     pin:sp.pin,
    //  cover:sp.cover,
     soluong:sp.soluong,
     km:sp.km,
     loai: sp.loai,
      };
    return this.http.put('http://127.0.0.1:8000/sanpham/objectsp/' + sp.id + '/', body,
    {headers: this.httpHeaders});
  }
  createsp(sp): Observable<any> {
    const body = {
    loai: sp.loai,
    ten: sp.ten,
    giagoc: sp.giagoc, 
    manhinh: sp.manhinh, 
    chip: sp.chip,
     ram: sp.ram,
     bonhotrong: sp.bonhotrong,
     camerasau:sp.camerasau,
     pin:sp.pin,
     cover:sp.cover,
     soluong:sp.soluong};
    return this.http.post('http://localhost:8000/sanpham/sanpham/', body,
    {headers: this.httpHeaders});
  }
  deleteMovie(id): Observable<any> {
    return this.http.delete('http://127.0.0.1:8000/sanpham/objectloai/' + id + '/',
    {headers: this.httpHeaders});
  }
}
