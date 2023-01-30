import { Component, OnInit } from '@angular/core';
import {SourceinputService} from './sourceinput.service'
@Component({
  selector: 'app-sourceinput',
  templateUrl: './sourceinput.component.html',
  styleUrls: ['./sourceinput.component.css']
})
export class SourceinputComponent implements OnInit {

  selectedS;
  sourceinput =[
    {id:''},
    {name:''},
    {email :''}, 
    { address:''},
    { phone:''},
     ];
  constructor(private api: SourceinputService) { }

  ngOnInit(): void {
    this.getSC();
    this.selectedS = {
      id: -1,
       name: '',
        email:'',
        address:'',
        phone:'',
      };
  }

  getSC = () => {
    this.api.getallS().subscribe(
      data => {
       this.sourceinput = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  SClicked = (s) => {
    this.api.getOneS(s.id).subscribe(
      data => {
        this.selectedS = data;
      },
      error => {
        console.log(error);
      }
    );
  }

   SallBack = () => {
    this.api.getallS().subscribe(
      data => {
        this.selectedS = {
          id: -1, 
          name: '',
          email:'',
          address:'',
          phone:''
        };
      },
      error => {
        console.log(error);
      }
    );
  }

  updateSC = () => {
    this.api.updateS(this.selectedS).subscribe(
      data => {
        this.getSC();
      },
      error => {
        console.log(error);
      }
    );
  }
  createSC = () => {
    this.api.createS(this.selectedS).subscribe(
      data => {
        this.sourceinput.push(data);
      },
      error => {
        console.log(error);
      }
    );
  }
  deleteSC = () => {
    this.api.deleteS(this.selectedS.id).subscribe(
      data => {
        this.getSC();
      },
      error => {
        console.log(error);
      }
    );
  }

}
