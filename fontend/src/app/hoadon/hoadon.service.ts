import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {} from '@angular/common/'
import {UserService} from '../user.service';
// import {CartService} from '../cart.service';
// import {Router} from '@angular/router';
@Injectable({
    providedIn: 'root'
  })
  export class HoadonService {
    constructor(private http: HttpClient,public _userService: UserService
      // , private cart : CartService,
      ) { }
  
    getallHoadon(): Observable<any> {
      return this.http.get('http://127.0.0.1:8000/purchase/PurchaseInvoiceList/', this.getHttpOptions()
     );
    }
    getallHoadonnew(){
      return this.http.get<ProductResponseModel[]>('http://127.0.0.1:8000/purchase/PurchaseInvoiceList/', this.getHttpOptions()
     ).toPromise();
    }
     
    getOneHoadon(id): Observable<any> {
      return this.http.get('http://127.0.0.1:8000/purchase/hoadon/' + id + '/',
      );
    }

    getOnectdh1(id): Observable<any> {
      return this.http.get('http://127.0.0.1:8000/purchase/ctdhobjget/' + id + '/',
      );
    }

    getOnectdhnid(): Observable<any> {
      return this.http.get('http://127.0.0.1:8000/purchase/noid/' ,this.getHttpOptions()
      );
    }

    getOnectdh(id): Observable<any> {
      return this.http.get('http://127.0.0.1:8000/purchase/ctdhobj/' + id + '/',
      );
    }
    // khong sai sai cai getOnectdh1
    getOneChitietS(id): Observable<any> {
      return this.http.get('http://127.0.0.1:8000/purchase/chitietV/' + id + '/',
     );
    }
  
    updateCtdhS(hoa): Observable<any> {
      const body = {id: hoa.id , soluong: hoa.soluong, sanpham:hoa.sanpham, donhang:hoa.donhang, gia:hoa.gia};
      return this.http.put('http://127.0.0.1:8000/purchase/ctdhobj/' + hoa.id + '/', body,
      );
    }
    createHoadon(de): Observable<any> {
      //  const body = {soluong:de.soluong, sanpham:de.sanpham};
      console.log(this.getHttpOptions())
      return this.http.post('http://127.0.0.1:8000/purchase/PurchaseInvoiceList/',JSON.stringify(de),this.getHttpOptions());
      // tongtien: hoa.tongtien,  trangthaidonhang:hoa.trangthaidonhang, hinhthucthanhtoan:hoa.hinhthucthanhtoan ngaytao:hoa.ngaytao,
      // console.log(JSON.stringify(body))
      // console.log(this.getHttpOptions())
    }

    taonews(de): Observable<any> {
      //  const body = {soluong:de.soluong, sanpham:de.sanpham};
      console.log(this.getHttpOptions())
      return this.http.post('http://127.0.0.1:8000/purchase/make/',JSON.stringify(de),this.getHttpOptions());
      // tongtien: hoa.tongtien,  trangthaidonhang:hoa.trangthaidonhang, hinhthucthanhtoan:hoa.hinhthucthanhtoan ngaytao:hoa.ngaytao,
      // console.log(JSON.stringify(body))
      // console.log(this.getHttpOptions())
    }


     

    // CheckoutFromCart1() {
    //           this.getallHoadonnew().then(prods => {
    //             this.router.navigate(['/thankyou']).then(p => {
    //               this.cart.cartDataClient = {total: 0, prodData: [{incart: 0, id: 0}]};
    //               this.cart.cartTotal$.next(0);
    //               localStorage.setItem('cart', JSON.stringify(this.cart.cartDataClient));
    //             });

    //           });
    // }


    deleteHoadon(id): Observable<any> {
      return this.http.delete('http://127.0.0.1:8000/purchase/donhangdetail/' + id  +'/');                                                                                                                                                                                                                                                                                                    
    }

    createCtdh(id, a): Observable<any> {
      const body = {soluong:a.soluong, sanpham:a.sanpham};
      console.log(JSON.stringify(body))
      // console.log(this.getHttpOptions())
      console.log(a.soluong)
      console.log(a.sanpham)
      return this.http.post('http://127.0.0.1:8000/purchase/detail/' + id + '/',JSON.stringify(body),this.getHttpOptions());
    }

    kiemtraS(id): Observable<any> {
      return this.http.get('http://127.0.0.1:8000/purchase/kiemtra/' + id + '/' ,this.getHttpOptions());
    }
    


    createCtdh1(a): Observable<any> {
      const body = {soluong:a.soluong, sanpham:a.sanpham}; 
      console.log(this.getHttpOptions())
      return this.http.post('http://127.0.0.1:8000/purchase/detail/' + 124 + '/',JSON.stringify(body),this.getHttpOptions());
    }

    deleteCtdh(id): Observable<any> {
      // const body = {id: hoa.id }
      return this.http.delete('http://127.0.0.1:8000/purchase/DetailedPurchaseInvoiceDetails                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          /' + id + '/',
      );                                                                                                                                                                                                                                                                                                    
    }
   

    getid(): Observable<any> {
      return this.http.get('http://127.0.0.1:8000/purchase/idV',this.getHttpOptions());                                                                                                                                                                                                                                      
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
  