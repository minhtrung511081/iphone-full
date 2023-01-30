import { Component, OnInit } from '@angular/core';
import {KhuyenmaiService} from "./khuyenmai.service";
@Component({
  selector: 'app-khuyenmai',
  templateUrl: './khuyenmai.component.html',
  styleUrls: ['./khuyenmai.component.css']
})
export class KhuyenmaiComponent implements OnInit {
  selectedkm;
  khuyenmai =[
  {id:''},
  {ma:''},
  {ten :''}, 
  { giatri:''},
  { ngaybd:''},
  {ngaykt:''},
  {ngaytao:''}
   ];
  constructor(private api: KhuyenmaiService) { }

  ngOnInit(): void {
    this.getKmC();
    this.selectedkm = {
      id: -1,
      ma:'',
      ten :'', 
      giatri:'',
      ngaybd:'',
      ngaykt:'',
      // ngaytao:''
      };
  }


  getKmC = () => {
    this.api.getallKm().subscribe(
      data => {
       this.khuyenmai = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  kmClicked = (km) => {
    this.api.getOneKm(km.id).subscribe(
      data => {
        this.selectedkm = data;
      },
      error => {
        console.log(error);
      }
    );
  }

   kmallBack = () => {
    this.api.getallKm().subscribe(
      data => {
        this.selectedkm = {
          id: -1, 
          loai: '',
          
        };
      },
      error => {
        console.log(error);
      }
    );
  }

  updateKmC = () => {
    this.api.updateKm(this.selectedkm).subscribe(
      data => {
        this.getKmC();
      },
      error => {
        console.log(error);
      }
    );
  }
  createKmC = () => {
    this.api.createKm(this.selectedkm).subscribe(
      data => {
        this.khuyenmai.push(data);
      },
      error => {
        console.log(error);
      }
    );
  }
  deleteKmC = () => {
    this.api.deleteKm(this.selectedkm.id).subscribe(
      data => {
        this.getKmC();
      },
      error => {
        console.log(error);
      }
    );
  }
}
