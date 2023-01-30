import {Injectable} from '@angular/core';
import {GoogleLoginProvider, SocialUser} from 'angularx-social-login';
// AuthService, 
import {HttpClient, HttpErrorResponse} from '@angular/common/http';

// import {environment} from '../../environments/environment';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class UsernewService {
  auth = false;
  // private SERVER_URL = environment.SERVER_URL;
  private user;
  authState$ = new BehaviorSubject<boolean>(this.auth);
  userData$ = new BehaviorSubject<SocialUser | 'response' | object>(null);
  loginMessage$ = new BehaviorSubject<string>(null);
  userRole: number;

  constructor(
    // private authService: AuthService,
              private httpClient: HttpClient
  ) {}

}
