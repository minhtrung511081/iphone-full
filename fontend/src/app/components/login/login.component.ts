import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
// import {AuthService} from 'angularx-social-login';
import { ActivatedRoute, Router } from '@angular/router';
import {UserService} from '../../user.service'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public user: any;
  constructor(
    public _userService: UserService,
    private router: Router
    ) {
  }

  ngOnInit(): void {
    this.user = {
      username: '',
      password: ''
    };


  }


  // signInWithGoogle() {
  //   this.userService.googleLogin();
  // }

  login() {
    this._userService.login({'username': this.user.username, 'password': this.user.password});
    // this.router.navigate(['/profile']);
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
