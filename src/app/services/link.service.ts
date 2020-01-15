import { HttpClient } from '@angular/common/http';
import { Link } from './../model/link.model';
import { OnInit, Injectable } from '@angular/core';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class LinkService {
 
  downloadLink: Link[] = [ ]

  constructor(private http:HttpClient){}

 


  getAllDownloadLink(){
    return this.http.get<Link>("https://movieemaza.firebaseio.com/post.json")
    .pipe(map(responseData=>{
      const tranformedData = [];
      for(const key in responseData){
          tranformedData.push({...responseData[key], id:key})
      }
      return tranformedData;
    }))
  }

  postLinks(value: any){
    return this.http.post(`https://movieemaza.firebaseio.com/post.json`,{
      date:new Date(),
      description: "",
      displayName:value.title,
      downloadLink:value.link
    })
  }

}