import { Component } from '@angular/core';
import { AuthUserService, AuthResponseData } from './auth-user.service';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';




@Component({
  selector: 'app-auth-user',
  templateUrl: './auth-user.component.html',
  styleUrls: ['./auth-user.component.css']
})
export class AuthUserComponent {

  isLoginMode: boolean = true;
  isLoading: boolean = false;
  error: string = null;
  statusMessage: string = null;

  constructor(private authUserService: AuthUserService, private router: Router) { }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(formData: NgForm) {
    if (!formData.valid) {
      return;
    }
    // let authObs: Observable<AuthResponseData>;
    this.isLoading = true;
    const email = formData.value.email;
    const password = formData.value.password;

    //   if (this.isLoginMode) {
    //     console.log("loginMode");
    //     authObs = this.authUserService.logIn(email, password);
    //   } else {
    //     console.log("sign up mode");
    //     authObs = this.authUserService.signUp(email, password);
    //   }
    //   authObs.subscribe((response) => {
    //     console.log(response);
    //     this.isLoading = false;

    //     this.router.navigate(['/auth']);
    //   }, errorMessage => {
    //     this.error = errorMessage;
    //     this.isLoading = false;
    //   });
    //   formData.reset();
    // }

    if (this.isLoginMode) {
      console.log("loginMode");
      this.authUserService.logIn(email, password).subscribe((response) => {
        // console.log(response);
        this.isLoading = false;
        this.router.navigate(['/trending']);
      }, errorMessage => {
        this.error = errorMessage;
        this.isLoading = false;
        setTimeout(() => {
          this.error = null;
        },3000)
      });
    } else {
      console.log("sign up mode");
      this.authUserService.signUp(email, password).subscribe((response) => {
        // console.log(response);
        this.isLoading = false;
        setTimeout(() => {
          this.statusMessage = null;
        }, 1000)
        this.statusMessage = "successfully signIn"
        this.router.navigate(['/auth']);
      }, errorMessage => {
        this.error = errorMessage;
        this.isLoading = false;
      });
    }

    formData.reset();
  }

}


