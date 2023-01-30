import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
// import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {SanPhamModelServer, ServerResponse} from './models/product.model';
import { HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  httpHeaders = new HttpHeaders({'Content-Type': 'application/json',
});
  constructor(private http: HttpClient) { 

  }

  /* This is to fetch all products from the backend server */
  getAllProducts(numberOfResults= 10) : Observable<ServerResponse> {
    return this.http.get<ServerResponse>('http://127.0.0.1:8000/sanpham/sanpham/', {
      
      params: {
        limit: numberOfResults.toString()
      }
    });
  } 

  /* GET SINGLE PRODUCT FROM SERVER*/
  getSingleProduct(id: number): Observable<SanPhamModelServer> {
    return this.http.get<SanPhamModelServer>('http://127.0.0.1:8000/sanpham/objectsp/' + id+'/');
  }

  /*GET PRODUCTS FROM ONE CATEGORY */
  getProductsFromCategory(catName: string) : Observable<SanPhamModelServer[]>  {
    return this.http.get<SanPhamModelServer[]>('http://127.0.0.1:8000/statistic/manageCategories/' + catName);
   }
   getSProduct(): Observable<any> {
    return this.http.get('http://127.0.0.1:8000/sanpham/sanpham/',
    {headers: this.httpHeaders});
  }
}
