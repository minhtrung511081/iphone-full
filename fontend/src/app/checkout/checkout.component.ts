import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {CartService} from '../cart.service';
import {OrderService} from '../order.service';
import {Router} from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';
import {CartModelServer} from '../models/cart.model';
import {UserService} from '../user.service';
import {HoadonService} from '../hoadon/hoadon.service'
import {AccountService} from '../account/account.service'
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
 // @Output() myEvent = new EventEmitter();
  selectedHoadon;
 // public idhd=0;
  cartTotal: number;
  cartData: CartModelServer;
  //userId;
  constructor(
    private cartService: CartService,
              private orderService: OrderService,
              private router: Router,
              private spinner: NgxSpinnerService,
              private userService: UserService,
              private hoadonService: HoadonService,
              private accountService: AccountService,
  ) { 
    
  }

  ngOnInit(): void {
    this.cartService.cartData$.subscribe(data => this.cartData = data);
    this.cartService.cartTotal$.subscribe(total => this.cartTotal = total);
   // this.accountService.getAllMovies().subscribe(data => {
      // @ts-ignore
    //  this.userId = data.id;
   //   console.log(this.userId);
//});
    // this.getidC();
    this.selectedHoadon = {
      id: -1,
      trangthaidonhang:'',
          hinhthucthanhtoan:''
      };
     // this.idhd=0;

  }

  
  createHoadonC = () => {
    this.hoadonService.createHoadon(this.selectedHoadon).subscribe(
      data => {
       // this.idhd=data;
      }, 
      error => {
        console.log(error);
      }
    );
  }

  // getidC = ()=>{
  //   this.hoadonService.getid().subscribe(
  //     data =>{
  //       this.idhd=data;
  //     },
  //     error =>{
  //       console.log(error);
  //     }
  //   )
  // }

  onCheckout() {
    
    if (this.cartTotal > 0) {
      this.spinner.show();
      this.cartService.CheckoutFromCart();
    } else {
      return;
    }
    this.cartService.add();
   // this.myEvent.emit(null)

  }

}