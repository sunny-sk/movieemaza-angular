import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VideoServices } from './video.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})

export class VideoComponent implements OnInit {
  
  videos = [];
  id: number;
  maxVideoLength = 5;
  constructor(private route : ActivatedRoute,
     private videoServices: VideoServices,private sanitizer: DomSanitizer){}

  ngOnInit() {
   this.route.queryParams.subscribe(data=>{
     this.id = data.id;
   })
   this.videoServices.fetchVideos(this.id).subscribe(data=>{
    if(data.videos.results.length > 0){
      if(data.videos.results.length > 0 && data.videos.results.length < this.maxVideoLength){
        for(var i = 0 ; i < data.videos.results.length;i++){
          // this.videos.push(data.videos.results[i].key);
       this.videos.push(this.sanitizer
                            .bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/`+data
                            .videos.results[i].key));
        }
      }
      
    }
    }
    )
  console.log(this.videos);

}
}
   
