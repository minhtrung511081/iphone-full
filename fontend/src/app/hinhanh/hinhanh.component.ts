import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Mausp} from './hinhanh.models';
import { ProductService } from '../product.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-hinhanh',
  templateUrl: './hinhanh.component.html',
  styleUrls: ['./hinhanh.component.css']
})
export class HinhanhComponent implements OnInit {
  // ten: string;
  // cover: File;
  // duongdan: string;
  // mausp:string;
  ten: string;
  giagoc: string;
  manhinh: string;
  chip: string;
  ram : string;
  bonhotrong: string;
  camerasau : string;
  cameratruoc: string;
  pin: string;
  cover: File;
  soluong : string;
  km : string;
  loai: string;

  mauspList: Mausp[];
  constructor(private http: HttpClient,
    public service: ProductService,
    public currentRoute: ActivatedRoute
    ) { }

  ngOnInit(): void {
    // let orderID = this.currentRoute.snapshot.paramMap.get('id');
    
    //   this.service.(parseInt(orderID)).then(res => {
    //     this.service.formData = res.order;
    //     this.service.orderItems = res.orderDetails;
    //   });
    // }
    // this.customerService.getCustomerList().then(res => this.customerList = res as Customer[]);
  }

  onTenChanged(event: any) {
    this.ten = event.target.value;
  }
 
  

  onGiagocChanged(event: any) {
    this.giagoc = event.target.value;
  }

  onManhinhChanged(event: any) {
    this.manhinh = event.target.value;
  }

  onChipChanged(event: any) {
    this.chip = event.target.value;
  }

  onRamChanged(event: any) {
    this.ram = event.target.value;
  }

  onBonhotrongChanged(event: any) {
    this.bonhotrong = event.target.value;
  }

  onCamerasauChanged(event: any) {
    this.camerasau = event.target.value;
  }

  onCameratruocChanged(event: any) {
    this.cameratruoc = event.target.value;
  }

  onPinChanged(event: any) {
    this.pin = event.target.value;
  }

  onCoverChanged(event: any) {
    this.cover = event.target.files[0];
  }


  onSoluongChanged(event: any) {
    this.soluong = event.target.value;
  }



  onKhuyenmaiChanged(event: any) {
    this.km = event.target.value;
  }

  onLoainChanged(event: any) {
    this.loai = event.target.value;
  }



  //  onTenChanged(event: any) {
  //   this.ten = event.target.value;
  // }

  // onDuongdanChanged(event: any) {
  //   this.duongdan = event.target.value;
  // }


  // onMauspChanged(event: any) {
  //   this.mausp = event.target.value;
  // }


  // onImageChanged(event: any) {
  //   this.cover = event.target.files[0];
  // }

  newBook() {
    const uploadData = new FormData();
    // uploadData.append('ten', this.ten);
    // uploadData.append('duongdan', this.duongdan);
    // uploadData.append('mausp', this.mausp);
    // uploadData.append('cover', this.cover, this.cover.name);
    uploadData.append('ten', this.ten);
    uploadData.append('giagoc', this.giagoc);
    uploadData.append('chip', this.chip);
    uploadData.append('ram', this.ram);
    uploadData.append('bonhotrong', this.bonhotrong);
    uploadData.append('camerasau', this.camerasau);
    uploadData.append('cameratruoc', this.cameratruoc);
    uploadData.append('pin', this.pin);
    uploadData.append('cover', this.cover, this.cover.name);
    uploadData.append('soluong', this.soluong);
    uploadData.append('km', this.km);
    uploadData.append('loai', this.loai);
    // this.http.post('http://127.0.0.1:8000/sanpham/hinhanh1/',uploadData).subscribe(
     this.http.post('http://127.0.0.1:8000/sanpham/sanpham/',uploadData).subscribe(
      data => console.log(data),
      error => console.log(error),
    );
  }

}
