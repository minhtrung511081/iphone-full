import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
// import {environment} from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private products: ProductResponseModel[] = [];
  constructor(private http: HttpClient) { }

  getSingleOrder(orderId: number) {
    return this.http.get<ProductResponseModel[]>('http://127.0.0.1:8000/purchase/hoadon/' + orderId).toPromise();
  }
}
interface ProductResponseModel {
  id: number;
  // title: string;
  // description: string;
  // price: number;
  // quantityOrdered: number;
  // image: string;
  ngaytao:Date;
  customer:string;
}
