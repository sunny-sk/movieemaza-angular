import { environment } from './../../environments/environment';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';
import { AuthUserModel } from './auth-user.model';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';




export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

@Injectable({
  providedIn : "root"
})
export class AuthUserService {

  user = new BehaviorSubject<AuthUserModel>(null);


  private tokenExpirationTimer: any;
  constructor(private http: HttpClient, private router: Router) { }


  logOut() {
    this.user.next(null);
    // this.router.navigate(['/auth'])
    this.router.navigate(['/'])
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
  }

  autoLogIn() {
    const userData: {
      email: string,
      id: string,
      _token: string,
      _tokenExpirationDate: string,
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }
    const loadedUser = new AuthUserModel(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate))
    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logOut();
    }, expirationDuration)
  }

  signUp(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.key}`,
        {
          email: email,
          password: password,
          returnSecureToken: true
        }).pipe(catchError(this.handleError), tap((resData) => {
          // this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
     
        }))
  }

  logIn(email: string, password: string) {
    return this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.key}`,
      {
        email: email,
        password: password,
        returnSecureToken: true
      }).pipe(catchError(this.handleError), tap((resData) => {
        this.handleAuthentication(resData.email,
          resData.localId,
          resData.idToken,
          +resData.expiresIn);
  
      }))
     
  }

  private handleAuthentication(email: string, userId: string, token: string, expiresIn) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new AuthUserModel(email, userId, token, expirationDate);
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }



  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'unknown error occured';
    if (!errorRes.error || !errorRes.error.error.message) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = "email already exists";
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = "no email  exists";
        break;
      case 'INVALID_PASSWORD':
        errorMessage = "incorrect password";
        break;
      case 'USER_DISABLED':
        errorMessage = 'user is disabled';
        break;
    }
    return throwError(errorMessage);
  }

}