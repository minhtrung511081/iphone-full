import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductcService} from '../../productc.service';
import {Subscription} from 'rxjs';
import { SanphamService } from '../../../sanpham/sanpham.service';
declare var $: any;

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss']
})
export class AllProductsComponent implements OnInit, OnDestroy {
  products: any[] = [];
  subs: Subscription[] = [];
  sanpham = [
    {id:''},
    {ten: ''},
   {giagoc: ''}, 
   {manhinh: ''}, 
   {chip: ''},
    {ram:''},
    {bonhotrong:''},
    {camerasau:''},
    {cameratruoc:''},
    {pin:''},
    {cover:''},
    {soluong:''},
    {km:''},
    {loai:''}

  ];
  errorMessage: string;
  hasError = false;
  success = false;

  constructor(private productService: ProductcService,
    public api: SanphamService,
    ) { }

  ngOnInit(): void {
    this.hasError = false;
    this.subs.push(this.productService.getAllProducts().subscribe((prods: any) => {
      this.products = prods.products;
      console.log(this.products);
    }));
    this.getMovies();
  }

  ngOnDestroy(): void {
    this.subs.map(s => s.unsubscribe());
  }


  getMovies = () => {
    this.api.getAllMovies().subscribe(
      data => {
        this.sanpham = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  deleteProduct(id: number): void {
    this.subs.push(this.productService.deleteProduct(id).subscribe(
      res => {
        if (res.status === 'failure') {
          this.hasError = true;
          this.errorMessage = res.message;
        }

        if (res.status === 'success') {
          this.success = true;
          this.errorMessage = res.message;
        }

        this.products = res.products;
        console.log(this.products);
        $('.alert').delay(1000).slideUp(1500);
      }
    ));
  }

}
