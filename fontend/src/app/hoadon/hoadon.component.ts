import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {HoadonService} from "./hoadon.service";
import {detail} from "../hoa"
import {CtdhComponent} from "../ctdh/ctdh.component"
import {SanphamComponent} from "../sanpham/sanpham.component"
import {UserService} from '../user.service';
import { SanphamService } from '../sanpham/sanpham.service';
import {CartService} from '../cart.service'
declare var paypal;
@Component({
  selector: 'app-hoadon',
  templateUrl: './hoadon.component.html',
  styleUrls: ['./hoadon.component.css']
})
export class HoadonComponent implements OnInit {
  @ViewChild('paypal', { static: true }) paypalElement : ElementRef;
  
  product = {
    price: 100,
    description: 'Bạn đã mua điện thoại iphone và thanh toán ở Shop Minh Trung',
    // img: 'assets/couch.jpg'
  };

  public sum=0;  
  value;
  idhd=0;
  selectedHoadon;
  selectcreate;
  selectedCtdh;
  hoadon =[
    {id:-1},
    {ngaytao :''}, 
    {customer:''}
  ];

  public ctdh =[
    {id: -1},
    {soluong:''},
    {sanpham:''},
    { donhang:''},
    { gia:''},
  ];
 
  constructor(
      private api: HoadonService,
      public p: SanphamService,
      private ca :CartService,
  )
  {
    // this.add(this.selectedCtdh);  
  }


  ngOnInit(): void {
    for(let j=0;j<this.ca.cartDataClient.prodData.length;j++){  
      console.log(this.ca.cartDataClient.prodData[j].id)
      this.selectcreate.sanpham=this.ca.cartDataClient.prodData[j].id
      this.selectcreate.soluong=this.ca.cartDataClient.prodData[j].incart
      console.log(this.ca.cartDataClient.prodData[j].incart)
      console.log(this.selectcreate.sanpham)
      console.log(this.selectcreate.soluong)
    }
    this.getHoadonC();
    this.getctdhC();
    // this.add1(this.selectedCtdh);
    // this.doisanpham();
    this.selectcreate={
      soluong:'',
      sanpham:'',
    };

    this.value = {
      id: -1,
      soluong:'',
      sanpham:'',
      donhang:'',
      gia:''
    };

    this.selectedHoadon = {
      id: -1,
      trangthaidonhang:'',
      hinhthucthanhtoan:''
    };
     
    this.selectedCtdh = {
      id: -1,
      soluong:'',
      sanpham:'',
      donhang:'',
      gia:''
    };

    paypal
      .Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                description: this.product.description,
                amount     :{
                  currency_code: 'USD',
                  value        : Math.ceil(this.sum),
                },
              },
            ]
          })
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          // console.log(order);
        },
        onError: err =>{
          console.log(err);
        }

        
      })
      .render( this.paypalElement.nativeElement );
  }
  

  doisanpham(){
    for(let j=0;j<this.selectedCtdh.length;j++){  
      this.sum+= this.selectedCtdh[j].gia*this.selectedCtdh[j].soluong
      this.product[j].description=this.selectedCtdh[j].gia
      this.product[j].gia = this.selectedCtdh[j].gia
    }
    this.product.price=this.sum
  }


  add1(selectedCtdh){ 
    this.value=this.selectedCtdh  
    for(let j=0;j<selectedCtdh.length;j++){  
        this.sum+= selectedCtdh[j].gia*selectedCtdh[j].soluong
    }
    this.sum = this.sum/23098
    // if(this.selectedCtdhC.id ==-1){
    //   // this.sum=0;
    // }
  }


  add(hoa){
    for(let j=0;j<this.ca.cartDataClient.prodData.length;j++){  
      console.log(this.ca.cartDataClient.prodData[j].id)
      this.selectcreate.sanpham=this.ca.cartDataClient.prodData[j].id
      this.selectcreate.soluong=this.ca.cartDataClient.prodData[j].incart
      console.log(this.ca.cartDataClient.prodData[j].incart)
      console.log(this.selectcreate.sanpham)
      console.log(this.selectcreate.soluong)
      
      this.api.createCtdh(hoa.id, this.selectcreate ).subscribe(
        data => {
          //this.selectedCtdh = data;
        },
        error => {
          console.log(error);
        }
      );
      console.log(this.ca.cartDataClient.prodData.length)
    }
  }


  kiemtraC(hoa){
    this.api.kiemtraS(hoa.id).subscribe(
      data => {
      // this.hoadon = data;
      },
      error => {
        console.log(error);
      }
    );
  }


  getHoadonC = () => {
    this.api.getallHoadon().subscribe(
      data => {
      this.hoadon = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  getctdhC = () => {
    this.api.getOnectdh1(this.idhd).subscribe(
      data => {
        // this.selectedCtdh = data;
        this.ctdh=data;
        // this.ngOnInit();
      },
      
      error => {
        console.log(error);
      }
    );
  }

  hoadonClicked = (hoa) => {
    this.api.getOneHoadon(hoa.id).subscribe(
      data => {
        this.selectedHoadon = data;
      },
      error => {
        console.log(error);
      }
    );
    
  }


  ChitietClicked = (hoa) => {

    for(let j=0;j<this.ca.cartDataClient.prodData.length;j++){  
      console.log(this.ca.cartDataClient.prodData[j].id)
      this.selectcreate.sanpham=this.ca.cartDataClient.prodData[j].id
      this.selectcreate.soluong=this.ca.cartDataClient.prodData[j].incart
      console.log(this.ca.cartDataClient.prodData[j].incart)
      console.log(this.selectcreate.sanpham)
      console.log(this.selectcreate.soluong)
      
      this.api.createCtdh(hoa.id, this.selectcreate ).subscribe(
        data => {
          //this.selectedCtdh = data;
        },
        error => {
          console.log(error);
        }
      );
      console.log(this.ca.cartDataClient.prodData.length)
    }



    this.api.getOnectdh1(hoa.id).subscribe(
      data => {
        this.selectedCtdh = data;
        this.ctdh=data;
        this.idhd=hoa.id;
        // this.ngOnInit();
      },
      
      error => {
        console.log(error);
      }
    );
    // this.add(this.selectedCtdh);
    

    this.api.kiemtraS(hoa.id).subscribe(
      data => {
      // this.hoadon = data;
      },
      error => {
        console.log(error);
      }
    );

    this.sum=0;
  }


  ThemClicked = (hoa) => {
    this.api.createCtdh(hoa.id, this.selectcreate ).subscribe(
      data => {
        this.selectedCtdh = data;
      }, 
      error => {
        console.log(error);
      }
    );
  }


  hoadonallBack = () => {
    this.api.getallHoadon().subscribe(
      data => {
        this.selectedHoadon = {
          id: -1, 
          trangthaidonhang:'',
          hinhthucthanhtoan:''
        };
      },
      error => {
        console.log(error);
      }
    );
  }


  createHoadonC = () => {
    this.api.createHoadon(this.selectedHoadon).subscribe(
      data => {
        this.hoadon.push(data);
      },
      error => {
        console.log(error);
      }
    );
  }


  taonew = () => {
    this.api.taonews(this.selectcreate).subscribe(
      data => {
        // this.hoadon.push(data);
      },
      error => {
        console.log(error);
      }
    );
  }


  deleteHoadonC = (hoa) => {
    // this.selectedHoadon.id
    this.api.deleteHoadon(hoa.id).subscribe(
      data => {
        
      },
      error => {
        console.log(error);
      }
    );
    this.constructor();
  }
  

}
interface ProductResponseModel {
  id: number;
  ten :string;
  gia: string;
  soluong: number;
  cover: number;
}
