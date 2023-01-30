import {Component, OnInit} from '@angular/core';
import {EmailValidator, FormBuilder, FormGroup, Validators} from '@angular/forms';
// import {CheckEmailService} from '../../validators/check-email.service';
// import {UserService} from '../../services/user.service';
import {RegisterService} from "../register/register.service";
import {map} from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-registernew',
  templateUrl: './registernew.component.html',
  styleUrls: ['./registernew.component.css'],
  // providers: [EmailValidator]
})
export class RegisternewComponent implements OnInit {
  public register: any;

  // registrationForm: FormGroup;
  // tslint:disable-next-line:max-line-length
  // private emailPattern = '(?:[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\\])';
  comparePassword: boolean;
  // registrationMessage: string;

  constructor(
    // private fb: FormBuilder,
    private registerService: RegisterService ,
    private router: Router
              // private checkEmailService: CheckEmailService,
              // private userService: UserService
              ) {

    // this.registrationForm = fb.group({
    //   fname: ['', [Validators.required, Validators.minLength(4)]],
    //   lname: ['', [Validators.required, Validators.minLength(4)]],
    //   email: ['', [Validators.required, Validators.pattern(this.emailPattern)],
    //     // [this.checkEmailService.emailValidate()]
    //   ],
    //   password: ['', [Validators.required, Validators.minLength(6)]],
    //   confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
    // });
  }

  // get formControls() {
  //   return this.registrationForm.controls;
  // }


  ngOnInit(): void {
    // this.registrationForm.valueChanges
    //   .pipe(map((controls) => {
    //     return this.formControls.confirmPassword.value === this.formControls.password.value;
    //   }))
    //   .subscribe(passwordState => {
    //     console.log(passwordState);
    //     this.comparePassword = passwordState;
    //   });

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

  // registerUser(){
  //   this.registerService.registerUser(this.register).subscribe(
  //       response =>{
  //         alert('User ' + this.register.username + 'has been created!')
  //       },
  //       error => console.log('error', error)

  //   );
  //     }

  registerUser() {

    // if (this.registrationForm.invalid) {
    //   return;
    // }

    // @ts-ignore
    this.registerService.registerUser(this.register).subscribe(
      response =>{
        alert('User ' + this.register.username + ' has been created!')
      },
      error => console.log('error', error)

  );

    // this.registrationForm.reset();
  }
}
 