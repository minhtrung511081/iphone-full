import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';
import {switchMap} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ProductcService {

  httpHeaders = new HttpHeaders({'Content-Type': 'application/json',
});

  constructor(private httpClient: HttpClient) { }
  getAllProducts(): Observable<any[]> {
    return this.httpClient.get<any[]>('http://127.0.0.1:8000/sanpham/sanpham/',{headers: this.httpHeaders});
  }

  deleteProduct(productId): Observable<any> {
    return this.httpClient.delete<{ message?: string, status: string }>(`http://127.0.0.1:8000/sanpham/objectsp/${productId}/`)
      .pipe(
        switchMap(async (data) => {
          const prods = await this.getAllProducts().toPromise();
          return {
            ...data,
            ...prods
          };
        })
      );
  }
}
