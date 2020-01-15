
import { Component, OnInit } from '@angular/core';
import { AuthUserService } from './auth-user/auth-user.service';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  serviceWorkerUpdate : boolean = false;



  constructor(private authUserService: AuthUserService,
    private update: SwUpdate
  ) {
    this.update.available.subscribe(event =>{
      this.serviceWorkerUpdate = true;
      // if(confirm("do you want to update app")){
      //   this.update.activateUpdate().then(() => {
      //     document.location.reload();
      //   })
      // }else{
      //   document.location.reload();
      // }
    })
  }

  ngOnInit() {
    this.authUserService.autoLogIn();
  }

  onUpdateServiceWorker(){
    this.update.activateUpdate().then(() => {
      document.location.reload();
    })
  }


}
