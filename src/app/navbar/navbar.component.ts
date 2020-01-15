import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthUserService } from '../auth-user/auth-user.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { dropDown } from '../../animations/animations';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'], 
   animations : [
    dropDown
  ]
})
export class NavbarComponent implements OnInit, OnDestroy {

  isAuthenticated = false;
  userEmail?:string = null;
  private userSub: Subscription;
  deferredPrompt:any;
 

  constructor(private authUserService : AuthUserService,
    private route: ActivatedRoute,
    private router: Router,) { }

  ngOnInit() {
   this.userSub = this.authUserService.user.subscribe((user) => {
    //  console.log(user)
      // this.isAuthenticated = !user? false: true;
      this.isAuthenticated = !!user;
     if(this.isAuthenticated){
      this.userEmail = user.email
     }
   })

  

  }
  
  onLogout(){
   if(confirm("do you want to logout")){
     this.authUserService.logOut()
   }
  }

  ngOnDestroy(){
    this.userSub.unsubscribe();
  }
 

//   onAddToHomeScreen(){
//     console.log("button clicked");
// window.addEventListener('beforeinstallprompt', (e) => {
//   // Stash the event so it can be triggered later.
//   this.deferredPrompt = e;
// });
//   }

 

}
