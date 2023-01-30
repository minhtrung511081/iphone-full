import { Component, OnInit } from '@angular/core';
import {RegisterService} from "./register.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  register;
  constructor(private registerService: RegisterService) { }

  ngOnInit(): void {
    this.register = {
      username: '',
      password: '',
      email: '',
      first_name: '',
      last_name: '',
      address: '',
      phone: '',
    };
  }
    registerUser(){
    this.registerService.registerUser(this.register).subscribe(
        response =>{
          alert('User ' + this.register + 'has been created!')
        },
        error => console.log('error', error)

    );
 
  }

}
