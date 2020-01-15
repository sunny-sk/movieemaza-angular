import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) { }



  ngOnInit() {
    // this.http.get("https://movieemaza.firebaseio.com/post.json").subscribe((response) => {
    //   console.log(response);
    // },error=>{
    //   console.log(error);
    // })
  }

}

