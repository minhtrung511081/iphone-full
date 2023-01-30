import {Component, OnInit} from '@angular/core';
import {CartModelServer} from '../../models/cart.model';
import {SanphamComponent} from '../../sanpham/sanpham.component'
import {CartService} from '../../cart.service';
import { Router } from '@angular/router'; 
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  cartData: CartModelServer;
  cartTotal: number;
  constructor(
    public cartService: CartService,
    private router:Router,
  ) {
  }

  ngOnInit(): void {
    this.cartService.cartTotal$.subscribe(total => this.cartTotal = total);
    
    this.cartService.cartData$.subscribe(data => this.cartData = data);
    

  }
  selectProduct(id: number) {
    this.router.navigate(['/product', id]).then();
  }
}
