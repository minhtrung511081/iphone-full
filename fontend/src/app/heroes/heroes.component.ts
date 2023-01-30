import { Component, OnInit } from '@angular/core';
import { UserService} from './api.service'
@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
   input;
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.input = {
      username:"",
      password:""
    };
  }
  onLogin(){
    this.userService.LoginUser(this.input).subscribe(

      response => {
        console.log(response)
        alert('User '+ this.input.username + ' logged ');

      },
      error =>{
        console.log('error', error)
      }
    );
  }

}
