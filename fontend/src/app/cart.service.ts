import { Injectable } from '@angular/core';
import {CartModelPublic, CartModelServer,CartModelPublic1,ctdhpublic} from './models/cart.model';
import {BehaviorSubject} from 'rxjs';
import {SanphamService} from './sanpham/sanpham.service'
import {ProductModelServer} from './models/product.model';
import {SanPhamModelServer} from './models/product.model';
import {ToastrService} from 'ngx-toastr';
import {OrderService} from './order.service'
import {Router} from '@angular/router';
import { ActivatedRoute, NavigationExtras } from '@angular/router';
// import {ToastrService} from 'ngx-toastr';
import {NgxSpinnerService} from 'ngx-spinner'; 
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {UserService} from './user.service';
import {HoadonService} from './hoadon/hoadon.service'
import { JsonPipe } from '@angular/common';
// import { parseString } from '@angular/xml2js';
@Injectable({
  providedIn: 'root'
})
export class CartService {
  
  private selectedHoadon = {
    id: -1,
    trangthaidonhang:'',
        hinhthucthanhtoan:''
    };

  private detail = {
    sanpham:-1,
    soluong:-1
    };

  // Biến dữ liệu để lưu thông tin giỏ hàng trên bộ nhớ cục bộ của khách hàng
  public cartDataClient: CartModelPublic = {
    total: 0,
    prodData: [{
      incart: 0,
      id: 0
    }]
  };

  private cartDataClient1: CartModelPublic1 = {
    total1: 0,
    detail: [{
      soluong: 7,
      sanpham: 10
    }]
  };
  // Biến dữ liệu để lưu thông tin giỏ hàng trên máy chủ
  private cartDataServer: CartModelServer = { 
    total: 0,
    data: [{
      numInCart: 0,
      product: undefined
    }]
  }; 

  private cartCtdh: ctdhpublic = { 
    id: 0,
    soluong:0,
    gia:0,
    sanpham: [{
      id: 0,
      ten: '', 
      giagoc:0,
      cover:'',
      soluong:0,
    }]
  }; 
 
//   THEO DÕI CÁC THÀNH PHẦN ĐỂ ĐĂNG KÝ
  cartTotal$ = new BehaviorSubject<number>(0);
  cartData$ = new BehaviorSubject<CartModelServer>(this.cartDataServer); 
  ctdhData$ = new BehaviorSubject<ctdhpublic>(this.cartCtdh);
  constructor(
    public api:SanphamService,
    private toast: ToastrService,
    private spinner: NgxSpinnerService,
    private http: HttpClient,
    // private productService: ProductService,
    private orderService: OrderService,
    private router: Router,
    public _userService:UserService,
    private hoadonService: HoadonService,
  ) {

    this.cartTotal$.next(this.cartDataServer.total);
    this.cartData$.next(this.cartDataServer);

    // Lấy thông tin từ bộ nhớ cục bộ (nếu có)
    const info: CartModelPublic = JSON.parse(localStorage.getItem('cart'));
    

    if (info !== null && info !== undefined && info.prodData[0].incart !== 0) {
      // Bộ nhớ cục bộ không trống và có một số thông tin
      this.cartDataClient = info;

      // Lặp qua từng mục nhập và đặt nó vào đối tượng cartDataServer
      this.cartDataClient.prodData.forEach(p => {
        this.api.getOnesp(p.id).subscribe((actualProductInfo: SanPhamModelServer) => {
          if (this.cartDataServer.data[0].numInCart === 0) {
            this.cartDataServer.data[0].numInCart = p.incart;
            this.cartDataServer.data[0].product = actualProductInfo;
            this.CalculateTotal();
            this.cartDataClient.total = this.cartDataServer.total;
            localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
          } else {

            // CartDataServer đã có một số mục nhập trong đó
            this.cartDataServer.data.push({
              numInCart: p.incart,
              product: actualProductInfo
            });
            this.CalculateTotal();
            this.cartDataClient.total = this.cartDataServer.total;
            localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
          }
          this.cartData$.next({...this.cartDataServer});
        });
      });

    }

    
   }

   AddProductToCart(id: number, quantity?: number) {
     
    this.api.getSingleProduct(id).subscribe(prod => {
     
      // 1. Nếu giỏ hàng trống
        if (this.cartDataServer.data[0].product === undefined) {
          this.cartDataServer.data[0].product = prod;
          this.cartDataServer.data[0].numInCart = quantity !== undefined ? quantity : 1;
          this.CalculateTotal();
          this.cartDataClient.prodData[0].incart = this.cartDataServer.data[0].numInCart;
          this.cartDataClient.prodData[0].id = prod.id;
          this.cartDataClient.total = this.cartDataServer.total;
          localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
          this.cartData$.next({...this.cartDataServer});
          this.toast.success(`${prod.ten} đã thêm vào giỏ hàng`, 'Thêm sản phẩm', {
            timeOut: 1500, 
            progressBar: true,
            progressAnimation: 'increasing',
            positionClass: 'toast-top-right'
          });
  
        } else {
          const index = this.cartDataServer.data.findIndex(p => p.product.id === prod.id);  // -1 or a positive value
  
          
          // a. nếu mặt hàng đó đã có trong giỏ hàng => chỉ số là giá trị dương
          if (index !== -1) {
            if (quantity !== undefined && quantity <= prod.soluong) {
              this.cartDataServer.data[index].numInCart = this.cartDataServer.data[index].numInCart <= prod.soluong ? quantity : prod.soluong;
            } else {
              // tslint:disable-next-line:no-unused-expression
              this.cartDataServer.data[index].numInCart < prod.soluong ? this.cartDataServer.data[index].numInCart++ : prod.soluong;
            }
  
            this.cartDataClient.prodData[index].incart = this.cartDataServer.data[index].numInCart;
            this.CalculateTotal();
            this.cartDataClient.total = this.cartDataServer.total;
            localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
            this.toast.info(`${prod.ten} số lượng đã cập nhật trong giỏ hàng`, 'Cập nhật sản phẩm ', {
              timeOut: 1500,
              progressBar: true,
              progressAnimation: 'increasing',
              positionClass: 'toast-top-right'
            });
  
          } else {
            this.cartDataServer.data.push({
              numInCart: 1,
              product: prod
            });
  
            this.cartDataClient.prodData.push({
              incart: 1,
              id: prod.id
            });
            this.toast.success(`${prod.ten} đã thêm vào giỏ hàng`, 'Thêm sản phẩm', {
              timeOut: 1500,
              progressBar: true,
              progressAnimation: 'increasing',
              positionClass: 'toast-top-right'
            });
  
            this.CalculateTotal();
            this.cartDataClient.total = this.cartDataServer.total;
            localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
            this.cartData$.next({...this.cartDataServer});
          }  // END OF ELSE
        }
      });
    }


    UpdateCartItems(index: number, increase: boolean) {
      const data = this.cartDataServer.data[index];
  
      if (increase) {
        data.numInCart < data.product.soluong ? data.numInCart++ : data.product.soluong;
        this.cartDataClient.prodData[index].incart = data.numInCart;
        this.CalculateTotal();
        this.cartDataClient.total = this.cartDataServer.total;
        localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
        this.cartData$.next({...this.cartDataServer});
      } else {
        data.numInCart--;
  
        if (data.numInCart < 1) {
          this.DeleteProductFromCart(index);
          this.cartData$.next({...this.cartDataServer});
        } else {
          this.cartData$.next({...this.cartDataServer});
          this.cartDataClient.prodData[index].incart = data.numInCart;
          this.CalculateTotal();
          this.cartDataClient.total = this.cartDataServer.total;
          localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
        }
      }
    }
  


    DeleteProductFromCart(index: number) {
      if (window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này không?')) {
        this.cartDataServer.data.splice(index, 1);
        this.cartDataClient.prodData.splice(index, 1);
        this.CalculateTotal();
        this.cartDataClient.total = this.cartDataServer.total;
  
        if (this.cartDataClient.total === 0) {
          this.cartDataClient = {total: 0, prodData: [{incart: 0, id: 0}]};
          localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
        } else {
          localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
        }
  
        if (this.cartDataServer.total === 0) {
          this.cartDataServer = {total: 0, data: [{numInCart: 0, product: undefined}]};
          this.cartData$.next({...this.cartDataServer});
        } else {
          this.cartData$.next({...this.cartDataServer});
        }
  
  
      } else {
        // IF THE USER CLICKS THE CANCEL BUTTON
        return;
      }
    }
    
    getHttpOptions() {
      return {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'JWT ' + this._userService.token
        })
      };
    }

    add(){
      for(let j=0;j<this.cartDataClient.prodData.length;j++){  
        console.log(this.cartDataClient.prodData[j].id)
        this.detail.sanpham=this.cartDataClient.prodData[j].id
        this.detail.soluong=this.cartDataClient.prodData[j].incart
        console.log(this.cartDataClient.prodData[j].incart)
        this.hoadonService.createCtdh1(this.detail)
      }

    }

    CheckoutFromCart() {
    // this.http.post('http://127.0.0.1:8000/purchase/make/',JSON.stringify(this.detail),this.getHttpOptions())
        // console.log(JSON.stringify(this.detail))
        // console.log(JSON.stringify(this.cartDataClient.prodData))
      // this.http.post('http://127.0.0.1:8000/purchase/PurchaseInvoiceList/',JSON.stringify(this.selectedHoadon),this.getHttpOptions())                                                                                              
      // .subscribe((res: { success: boolean }) => {
        
      // });
      
      
      // if (true) {
      //   this.resetServerData();
      //   this.http.post('http://127.0.0.1:8000/purchase/detail/' + userId +'/',JSON.stringify(this.cartDataClient.prodData),this.getHttpOptions()
      //   //  {
      //   //   products: this.cartDataClient.prodData
      //   // }
      //   )
        // .subscribe((data: OrderResponse) => {
          // this.orderService.getSingleOrder(userId).then(prods => {
            this.hoadonService.getallHoadonnew().then(prods => {
            // data.order_id
            // if (data.success) {
              const navigationExtras: NavigationExtras = {
                state: {
                  // message: data.message,
                  products: prods,
                  // orderId: data.order_id,
                  total: this.cartDataClient.total
                }
              };

              // this.spinner.hide();
              this.router.navigate(['/thankyou'], navigationExtras).then(p => {
                this.cartDataClient = {total: 0, prodData: [{incart: 0, id: 0}]};
                this.cartTotal$.next(0);
                localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
              });
            // }
          });
        // });
      // } 
      // else {
        // this.spinner.hide();
        // this.router.navigateByUrl('/checkout').then();
        // this.toast.error(`Sorry, failed to book the order`, 'Order Status', {
        //   timeOut: 1500,
        //   progressBar: true,
        //   progressAnimation: 'increasing',
        //   positionClass: 'toast-top-right'
        // });
      // }

    }
  
  









    private CalculateTotal() {
      let Total = 0;
  
      this.cartDataServer.data.forEach(p => {
        const {numInCart} = p;
        const {giagoc} = p.product;
  
        Total += numInCart * giagoc;
      });
      this.cartDataServer.total = Total;
      this.cartTotal$.next(this.cartDataServer.total);
    }
  
    CalculateSubTotal(index): number {
      let subTotal = 0;
  
      const p = this.cartDataServer.data[index];
      // @ts-ignore
      subTotal = p.product.giagoc * p.numInCart;
  
      return subTotal;
    }

    public resetServerData() {
      this.cartDataServer = {
        total: 0,
        data: [{
          numInCart: 0,
          product: undefined
        }]
      };
      
      this.cartDataClient = {
        total: 0,
        prodData: [{
          incart: 0,
          id: 0
        }]
      };
      this.cartData$.next({...this.cartDataServer});
      // this.cartData$.next({...this.cartDataClient});
    }
  }

  



  

interface OrderResponse {
  // order_id: number;
  id:number;
  ngaytao:Date;
  customer:string;
  success: boolean;
  message: string;
  products: [{
    id: string,
    numInCart: string
  }];
}
 
