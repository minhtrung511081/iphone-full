import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ProductService} from '../product.service';
import {CartService} from '../cart.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {map} from 'rxjs/operators';
// import * as $ from 'jquery';
import * as slick from 'slick-carousel';
declare var $: any;
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit, AfterViewInit  {

  id: number;
  product;
  thumbImages: any[] = [];
  @ViewChild('quantity') quantityInput;
  constructor(
    private productService: ProductService,
              private cartService: CartService,
              private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        map((param: ParamMap) => {
          // @ts-ignore
          return param.params.id;
        })
      )
      .subscribe(prodId => {
        this.id = prodId;
        this.productService.getSingleProduct(this.id).subscribe(prod => {
          this.product = prod;

          if (prod.cover !== null) {
            this.thumbImages = prod.cover.split(';');
          }

        });
      });
  }

  ngAfterViewInit(): void {
    // Product Main img Slick
        $('#product-main-img').slick({
          infinite: true,
          speed: 300,
          dots: false,
          arrows: true,
          fade: true,
          asNavFor: '#product-imgs',
        });
    
        // Product imgs Slick
        $('#product-imgs').slick({
          slidesToShow: 3,
          slidesToScroll: 1,
          arrows: true,
          centerMode: true,
          focusOnSelect: true,
          centerPadding: 0,
          vertical: true,
          asNavFor: '#product-main-img',
          responsive: [{
            breakpoint: 991,
            settings: {
              vertical: false,
              arrows: false,
              dots: true,
            }
          },
          ]
        });
    
        // Product img zoom
        // tslint:disable-next-line:prefer-const
        const zoomMainProduct = document.getElementById('product-main-img');
        if (zoomMainProduct) {
          $('#product-main-img .product-preview').zoom();
        }
      }

      
      Increase() {
        let value = parseInt(this.quantityInput.nativeElement.value);
    
        if (this.product.soluong >= 1) {
          value++;
    
          if (value > this.product.soluong) {
            value = this.product.soluong;
          }
        } else {
          return;
        }
    
        this.quantityInput.nativeElement.value = value.toString();
    
      }


      Decrease() {
        let value = parseInt(this.quantityInput.nativeElement.value);
    
        if (this.product.soluong > 0) {
          value--;
    
          if (value <= 1) {
            value = 1;
          }
        } else {
          return;
        }
    
        this.quantityInput.nativeElement.value = value.toString();
      }

      addToCart(id: number) {
        this.cartService.AddProductToCart(id, this.quantityInput.nativeElement.value);
      }

}
