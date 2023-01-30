import { Component, OnInit } from '@angular/core';
import { SanphamService } from './sanpham.service';
import {ProductService} from '../product.service'
import { HttpClient } from '@angular/common/http';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {Mausp} from '../hinhanh/hinhanh.models';
import { Observable } from 'rxjs';
import {UserService} from '../user.service';
import {HoadonComponent} from '../hoadon/hoadon.component'
import {CartService} from '../cart.service';
@Component({
  selector: 'app-sanpham',
  templateUrl: './sanpham.component.html',
  styleUrls: ['./sanpham.component.css']
})

export class SanphamComponent implements OnInit {
  selectedsp;
  isDivVisible = true;
  Ten : string;
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
  mauspList: Mausp[];

  constructor(
    public api: SanphamService, 
    private location: Location, 
    private router:Router, 
    public _router: Router, 
    public _location: Location, 
    public product : ProductService,
    public currentRoute: ActivatedRoute,
    public _user : UserService,
    private cartService: CartService,
    ) {
    this.getMovies();
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

  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    };

    let orderID = this.currentRoute.snapshot.paramMap.get('id');
    if (orderID == null)
      this.resetForm();
    else {
      this.api.getSanphamByID(parseInt(orderID)).then(res => {
        this.api.formData = res.order;
      });
    }
    // this.product.getSProduct().toPromise().then(res => this.mauspList = res as Mausp[]);

    if(this._user.username=='admin')
    this.isDivVisible=true;
    else this.isDivVisible=false
  }

  public Authenticated(): boolean {
   return true
    
  }

  

  spallBack = () => {
    this.api.getAllMovies().subscribe(
      data => {
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
      },
      error => {
        console.log(error);
      }
    );
  }



  AddProduct(id: number) {
    this.cartService.AddProductToCart(id);
  } 

  updatesp = () => {
    this.api.updatesp(this.selectedsp).subscribe(
      data => {
        this.getMovies();
      },
      error => {
        console.log(error);
      }
    );
  }
  createsp = () => {
    this.api.createsp(this.selectedsp).subscribe(
      data => {
        this.sanpham.push(data);
      },
      error => {
        console.log(error);
      }
    );
  }
  deletesp = () => {
    this.api.deleteMovie(this.selectedsp.id).subscribe(
      data => {
        this.getMovies();
      },
      error => {
        console.log(error);
      }
    );
  }

  Clicked1 = (sp) => {
    this.api.getOnesp(sp.id).subscribe(
      data => {
        this.selectedsp = data;
      },
      error => {
        console.log(error);
      }
    );
  }


Clicked = (sp) => {
  this.api.getOnesp(sp.id).subscribe(
    data => {
      this.selectedsp = data;
    },
    error => {
      console.log(error);
    }
  );
}


  resetForm(form?: NgForm) {
    if (form = null)
      form.resetForm();
    this.api.formData = {
      ten: null,
      duongdan:null,
      cover:null,
      mausp: null
    };
    
  }


  onChangeUrl(){
    this.location.replaceState('/loai');

  }

  refresh(): void {
    this._router.navigateByUrl("/refresh", { skipLocationChange: true }).then(() => {
      console.log(decodeURI(this._location.path()));
      this._router.navigate([decodeURI(this._location.path())]);
    });
  }


  onReloadRoute(){
    console.log(this.router.url);
    this.router.navigateByUrl('/hinhanh');
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


  Search(){
    if(this.Ten != ""){

      this.sanpham = this.sanpham.filter(res=>{
        return res.ten.toLocaleLowerCase().match(this.Ten.toLocaleLowerCase());
      });

    }else if (this.Ten == ""){
      this.ngOnInit();
    }
    
  }

  selectProduct(id: number) {
    this.router.navigate(['/product', id]).then();
  }

  AddToCart(id: number) {
    this.cartService.AddProductToCart(id);
  }

  
}
