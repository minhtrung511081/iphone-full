import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {UserService} from '../user.service'
@Component({
  selector: 'app-loginnew',
  templateUrl: './loginnew.component.html',
  styleUrls: ['./loginnew.component.css']
}) 
export class LoginnewComponent implements OnInit {
  public user: any;
  constructor(
    public _userService: UserService,
    private router: Router
    ) { }
  
  ngOnInit(): void {
    this.user = {
      username: '',
      password: ''
    };
  }

  login() {
    this._userService.login({'username': this.user.username, 'password': this.user.password});
    // this.router.navigate(['/sanpham']);
  }
 
  refreshToken() {
    this._userService.refreshToken();
  }
 
  logout() {
    this._userService.logout();
    this.user = {
      username: '',
      password: ''
    };
    localStorage.setItem('token','');
  }


}
