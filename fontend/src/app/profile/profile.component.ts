import {Component, OnInit} from '@angular/core';
import { SocialUser} from 'angularx-social-login';
import {UserService} from '../user.service';
import {ProfileService} from './profile.service'
import {Router} from '@angular/router';
import {map} from 'rxjs/operators';
import {AccountService} from '../account/account.service'
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  selectedMovie;


  constructor(
              private userService: UserService,
              private router: Router,
              public ac : AccountService,
              public pro : ProfileService,
              ) {
                this.getAccount();
  }

  ngOnInit(): void {
    
    this.selectedMovie = {id: -1, 
      username: '', 
      is_superuser: '', 
      is_staff: '', 
      first_name: '', 
      last_name: '', 
      email: '', 
      phone: '',
       addresss: ''};
    }
  
    getAccount = () => {
      this.pro.getaccount().subscribe(
        data => {
          this.selectedMovie = data;
        },
        error => {
          console.log(error);
        }
      );
    }

  logout() {
    this.userService.logout();
  }
}
