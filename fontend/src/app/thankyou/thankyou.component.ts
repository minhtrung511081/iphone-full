import { Component, OnInit } from '@angular/core';
import {OrderService} from '../order.service';
import {Router} from '@angular/router'; 
import {HoadonService} from '../hoadon/hoadon.service';
import {SanphamService} from '../sanpham/sanpham.service';
import {ctdhpublic} from '../models/cart.model';
import {CartService} from '../cart.service';
import {CtdhService} from '../ctdh/ctdh.service'
@Component({
  selector: 'app-thankyou',
  templateUrl: './thankyou.component.html',
  styleUrls: ['./thankyou.component.css']
})
export class ThankyouComponent implements OnInit {
  selectedsp;
  ctdhnew: ctdhpublic1;
  sanpham = [
    {id:-1},
    {ten: ''},
   {giagoc: ''}, 
    {cover:''},
    {soluong:''},
    {loai:''}
  ];

  public ctdh =[
    {id: -1},
    {soluong:''},
    {sanpham:''},
    { donhang:''},
    { gia:''},
     ];

  selectedCtdh;
  message: string;
 orderId: number;
//  products: ProductResponseModel[] = [];
 cartTotal: number;
  constructor(
    private router: Router,
              private orderService: OrderService,
              private hoadonService: HoadonService,
              private san :SanphamService,
              private cartService: CartService,
              private ct: CtdhService
  ) {
    this.ChitietClicked();
    // this.lay();
    const navigation = this.router.getCurrentNavigation();

    const state = navigation.extras.state as {
      message: string,
      // products: ProductResponseModel[],
      orderId: number,
      total: number
    };

    this.message = state.message;
    // this.products = state.products;
    // console.log(this.products);
    this.orderId = state.orderId;
    this.cartTotal = state.total;

   }

  ngOnInit(): void {
    // this.cartService.ctdhData$.subscribe(data => this.ctdhnew = data);
    this.selectedCtdh = {
      id: -1,
      soluong:'',
      sanpham:'',
      donhang:'',
      gia:''
    };
    this.selectedsp = {
      id: -1,
       ten: '',
       giagoc: '', 
       manhinh: '', 
       chip: '',
        ram:'',
        bonhotrong:'',
        camerasau:'',
        cameratruoc:'',
        pin:'',
        cover:'',
        soluong:'',
        km:'',
        loai: '',
      }; 
    
  }

  // lay(){
  //     this.ct.getctdhsp(this.ctdhnew.donhang).subscribe(
  //       data => {
  //         // this.selectedsp = data;
  //         // this.sanpham = data;
  //           this.ctdhnew=data;
  //       },
        
  //       error => {
  //         console.log(error);
  //       }
  //     );
  // }
  ChitietClicked = () => {
    this.hoadonService.getOnectdhnid().subscribe(
      data => {
        this.selectedCtdh = data;
        this.ctdh=data;
        this.ctdhnew=data;
      },
      
      error => {
        console.log(error);
      }
    );
    // this.add(this.selectedCtdh);
    // this.sum=0;
  }

  chon = (id) => {
    this.san.getspctdh(id).subscribe(
      data => {
        // this.selectedCtdh = data;
        // this.ctdh=data;
        // this.ctdhnew=data;
        this.sanpham=data;
      },
      
      error => {
        console.log(error);
      }
    );
    // this.add(this.selectedCtdh);
    // this.sum=0;
  }

}
interface ProductResponseModel {
  id: number;
  // name: string;
  // description: string;
  price: number;
  // image: string;
  quantityOrdered: number;
  ngaytao:Date;
  customer:string;
}
interface ctdhpublic1{
  id: number;
  soluong:number;
  gia:number;
  sanpham:number;
  donhang:number,
  cover:File;
  
}
interface sanphammodel{
  id: number,
  ten: string,
  giagoc:number,
  cover:string,
  soluong:number,
}


