import { LinkService } from './../services/link.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Form, NgForm } from '@angular/forms';

@Component({
  selector: 'app-post-link',
  templateUrl: './post-link.component.html',
  styleUrls: ['./post-link.component.css']
})
export class PostLinkComponent implements OnInit {
  
  isLoading = false;
  response = false;
  constructor(private http:HttpClient, private linkService : LinkService) { }
  
  ngOnInit() {
  }

  onSubmit(form:NgForm){
    this.isLoading= true;
    this.linkService.postLinks(form.value).subscribe(response=>{
      // console.log(response);
      this.isLoading = false;
      this.response = true;
      setTimeout(()=>{
        this.response = false;
      },700)
      form.reset();
    })
  
  }

}
