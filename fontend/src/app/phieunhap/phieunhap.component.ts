import { Component, OnInit } from '@angular/core';
import {PhieunhapService} from "./phieunhap.service";
import { SanphamService } from '../sanpham/sanpham.service';
@Component({
  selector: 'app-phieunhap',
  templateUrl: './phieunhap.component.html',
  styleUrls: ['./phieunhap.component.css']
})
export class PhieunhapComponent implements OnInit {
  public sum=0; 
  selectcreate;
  selectedsp;
  selectedP;
  selectedS;
  selectedCtpn;
  selectedCtpnC;
  phieunhap =[
  {id:''},
  // {tongtien:''},
  {ngaytao:''},
  {nguonnhap :''}, 
  { staff:''},
   ];

  constructor(private api: PhieunhapService, public p: SanphamService) {this.getMovies(); }

  ngOnInit(): void {
    this.getPC();
    this.getSC();
    this.selectcreate={
      soluong:'',
      sanpham:'',
    };
    this.selectedP = {
      id: -1,
      //  tongtien: '',
      //  ngaytao:'',
        nguonnhap:'',
        // staff:'',
      };
      this.selectedS = {
        id:'',
        name:'',
        email :'', 
        address:'',
        phone:'',
      }

      this.selectedCtpn = {
        id: -1,
        soluong:'',
        sanpham:'',
        phieunhap:'',
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
        this.selectedCtpnC = {
          id: -1,
          soluong:'',
          sanpham:'',
          phieunhap:'',
          gia:''
        };
  }


  getPC = () => {
    this.api.getallP().subscribe(
      data => {
       this.phieunhap = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  getSC = () => {
    this.api.getallS().subscribe(
      data => {
       this.selectedS = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  PClicked = (p) => {
    this.api.getOneP(p.id).subscribe(
      data => {
        this.selectedP = data;
      },
      error => {
        console.log(error);
      }
    );
  }

   PallBack = () => {
    this.api.getallP().subscribe(
      data => {
        this.selectedP = {
          id: -1, 
          tongtien:'',
          nguonnhap:'',
          staff:''
        };
      },
      error => {
        console.log(error);
      }
    );
  }

  updatePC = () => {
    this.api.updateP(this.selectedP).subscribe(
      data => {
        this.getPC();
      },
      error => {
        console.log(error);
      }
    );
  }
  createPC = () => {
    this.api.createP(this.selectedP).subscribe(
      data => {
        this.phieunhap.push(data);
      },
      error => {
        console.log(error);
      }
    );
    this.getSC
  }
  deletePC = () => {
    this.api.deleteP(this.selectedP.id).subscribe(
      data => {
        this.getPC();
      },
      error => {
        console.log(error);
      }
    );
  }

  deletectpnC = () => {
    this.api.deletectpn(this.selectedCtpnC.id).subscribe(
      data => {
        this.getPC();
      },
      error => {
        console.log(error);
      }
    );
  }

  updatectpnC = () => {
    this.api.updatectpn(this.selectedCtpnC).subscribe(
      data => {
        this.getPC();
      },
      error => {
        console.log(error);
      }
    );
  }

  xem = (p) => {
    this.api.getOnectpn1(p.id).subscribe(
      data => {
        this.selectedCtpn = data;
      },
      
      error => {
        console.log(error);
      }
    );
    // this.add(this.selectedCtdh);
    this.sum=0;
  }

  getMovies = () => {
    this.p.getAllMovies().subscribe(
      data => {
        this.selectedsp = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  them = (p) => {
    this.api.createCtpn(p.id, this.selectcreate ).subscribe(
      data => {
        this.selectedCtpn = data;
      },
      error => {
        console.log(error);
      }
    );

    // this.api.updatesanpham(p.id, this.selectcreate ).subscribe(
    //   data => {
    //     this.selectedCtpn = data;
    //   },
    //   error => {
    //     console.log(error);
    //   }
    // );
  }

  ctpnClicked = (hoa) => {
    this.api.getOnectpn(hoa.id).subscribe(
      data => {
        this.selectedCtpnC = data;
        
      },
      error => {
        console.log(error);
      }
    );
  }
}
