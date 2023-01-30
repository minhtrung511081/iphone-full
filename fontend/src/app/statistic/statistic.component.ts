import { Component, OnInit } from '@angular/core';
import { StatisticService } from './statistic.service';
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
@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.css']
})
export class StatisticComponent implements OnInit {
  selectedql;
  thongke;
  thongkeall;
  constructor(public api: StatisticService,private location: Location, 
    private router:Router, 
    public _router: Router, 
    public _location: Location, 
    public product : ProductService,
    public currentRoute: ActivatedRoute,
    public _user : UserService,) { 
    this.getloaiC();
    this.gethdC();
    this.getspC();
  }
  selectedgui;
  selectedhoadon;
  selectedloai;
  selectedadd;
  selectedaddress;
  selectedguinhap;
  selectednhap;
  selectedsp;
  ngOnInit(): void {
    this.selectedql = {
      id:'',
      ten:'',
      giagoc :'', 
      loai:'',
      soluong:'',
    }

    this.selectedaddress = {
      id_bill:'',
      id:'',
      sanpham:'',
      soluong :'', 
      gia:'',
      address:'',
      ten:'',
      first_name:'',
      last_name:'',
    }

    this.thongke = {
      id:'',
      sanpham:'',
      soluong :'', 
      gia:'',
      tongcong:'',
    }

    this.thongkeall = {
      soluong_total :'', 
      total_money:'',
    }

    this.selectednhap = {
      id:'',
      sanpham:'',
      soluong :'', 
      gia:'',
      loai:'',
      username:'',
      first_name_customer:'',
      last_name_customer:'',
      address:'',
      bill:''
    }

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

    this.selectedguinhap = {
      id:'',
    }

    this.selectedhoadon = {
      id:'',
      ngaytao:'',
      customer :'', 
    }

    this.selectedloai = {
      id:'',
      loai:''
    }
    this.selectedgui = {
      id:'',
    }
    this.selectedadd = {
      id:'',
    }
  }


  refresh(): void {
    this._router.navigateByUrl("/refresh", { skipLocationChange: true }).then(() => {
      console.log(decodeURI(this._location.path()));
      this._router.navigate([decodeURI(this._location.path())]);
    });
  }

  qllicked = () => {
    this.api.getql(this.selectedgui.id).subscribe(
      data => {
        this.selectedql = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  addlicked = () => {
    this.api.getaddS(this.selectedadd.id).subscribe(
      data => {
        this.selectedaddress = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  nhaplicked = () => {
    this.api.getnhapS(this.selectedguinhap.id).subscribe(
      data => {
        this.selectednhap = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  thongkeC = () => {
    this.api.getthongke(this.selectedguinhap.id).subscribe(
      data => {
        this.thongke = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  thongkeallC = () => {
    this.api.getthongkeall(this.selectedguinhap.id).subscribe(
      data => {
        this.thongkeall = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  getloaiC = () => {
    this.api.getloai().subscribe(
      data => {
        this.selectedloai = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  gethdC = () => {
    this.api.getallhd().subscribe(
      data => {
        this.selectedhoadon = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  getspC = () => {
    this.api.getallsp().subscribe(
      data => {
        this.selectedsp = data;
      },
      error => {
        console.log(error);
      }
    );
  }

}
