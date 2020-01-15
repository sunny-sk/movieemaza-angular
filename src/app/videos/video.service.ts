import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DetailService } from '../services/detail.service';


@Injectable({
    providedIn: 'root'
  })
export class VideoServices{
   constructor(private http: HttpClient, private detailsServices:DetailService){}

   fetchVideos(id:number){
      return this.detailsServices.fetchDetails(id)
   }

   

}