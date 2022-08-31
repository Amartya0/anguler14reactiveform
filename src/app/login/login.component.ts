import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators , FormControl} from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../user';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {
  authForm: FormGroup | any;
  isSubmitted = false;
  constructor(
    private authService: AuthService,
    private router: Router,) {
      this.authForm = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email, Validators.pattern(
          /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
        ),]),
        password: new FormControl('', [Validators.required,Validators.pattern(
          /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,127})/
        )])
      });
    }

  

  ngOnInit(): void {
  }

  get formControls(){return this.authForm.controls;}

  signIn(){
    this.isSubmitted=true;
    if(this.authForm.invalid){
      return;
    }
    this.authService.signIn(this.authForm.value);
    this.router.navigateByUrl('/admin');
  }

}
