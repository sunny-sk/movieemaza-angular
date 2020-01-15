import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild } from '@angular/router';

import { Injectable } from '@angular/core';
import { AuthUserService } from './auth-user.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';



@Injectable({
    providedIn:"root"
})
export class AuthUserGaurdService implements CanActivate, CanActivateChild {
   


  constructor(private router: Router, private authUserService: AuthUserService) { }

  canActivate(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.authUserService.user.pipe(map(user=>{
        return !user;
    }))
  }
  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
   return   this.authUserService.user.pipe(map(user=>{
        if(user != null){
            return true;
        }
        this.router.navigate(['/auth']);
        return false;
    }));
  }
}