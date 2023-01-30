import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  constructor(private http: HttpClient) { }

  getAllMovies(): Observable<any> {
    return this.http.get('http://127.0.0.1:8000/sanpham/loai/',
    {headers: this.httpHeaders});
  }

  getOneMovie(id): Observable<any> {
    return this.http.get('http://127.0.0.1:8000/sanpham/objectloai/' + id + '/',
    {headers: this.httpHeaders});
  }

  updateMovie(movie): Observable<any> {
    const body = {id: movie.id , loai: movie.loai };
    return this.http.put('http://127.0.0.1:8000/sanpham/objectloai/' + movie.id + '/', body,
    {headers: this.httpHeaders});
  }
  createMovie(movie): Observable<any> {
    const body = {loai: movie.loai };
    return this.http.post('http://localhost:8000/sanpham/loai/', body,
    {headers: this.httpHeaders});
  }
  deleteMovie(id): Observable<any> {
    return this.http.delete('http://127.0.0.1:8000/sanpham/objectloai/' + id + '/',
    {headers: this.httpHeaders});
  }
}
