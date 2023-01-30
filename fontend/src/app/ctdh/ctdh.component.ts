import { Component, OnInit } from '@angular/core';
import {CtdhService} from "./ctdh.service";
@Component({
  selector: 'app-ctdh',
  templateUrl: './ctdh.component.html',
  styleUrls: ['./ctdh.component.css']
})
export class CtdhComponent implements OnInit {
  ctdh =[
    {id:''},
    {soluong:''},
    {sanpham :''},
    { donhang:''},
     ];
  selectedCtdh;
  constructor(private api: CtdhService) { }

  ngOnInit(): void {
    this.getCtdhC();
    this.selectedCtdh = {
      id: -1,
        soluong:'',
        sanpham:'',
        donhang:'',
      };
  }

  getCtdhC = () => {
    this.api.getallCtdh().subscribe(
      data => {
       this.ctdh = data;
      },
      error => {
        console.log(error);
      }
    );
  }



  ctdhClicked = (ct) => {
    this.api.getOneCtdh(ct.id).subscribe(
      data => {
        this.selectedCtdh = data;
      },
      error => {
        console.log(error);
      }
    );
  }

   ctdhallBack = () => {
    this.api.getallCtdh().subscribe(
      data => {
        this.selectedCtdh = {
          id: -1, 
          soluong:'',
        sanpham:'',
        donhang:'',
          
        };
      },
      error => {
        console.log(error);
      }
    );
  }

  updateCtdhC = () => {
    this.api.updateCtdh(this.selectedCtdh).subscribe(
      data => {
        this.getCtdhC();
      },
      error => {
        console.log(error);
      }
    );
  }
  createCtdhC = () => {
    this.api.createCtdh(this.selectedCtdh).subscribe(
      data => {
        this.ctdh.push(data);
      },
      error => {
        console.log(error);
      }
    );
  }
  deleteCtdhC = () => {
    this.api.deleteCtdh(this.selectedCtdh.id).subscribe(
      data => {
        this.getCtdhC();
      },
      error => {
        console.log(error);
      }
    );
  }

}
