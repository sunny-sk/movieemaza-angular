import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DetailService } from '../services/detail.service';



@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  // from response1
  movieId: number;
  language: string;
  name: string;
  overView: string = '';
  runtime: number;
  tagLine: string;
  releaseDate: any;
  images: string[] = [];
  imagePath: string;
  categories: string[] = [];   // genres
  response: boolean;
  isLoading = true;

  // from response2

  type?: string = '';
  actors?:string = '';
  ratings?: { Source: string, Value: string }[] = [];


  // error
  status = 1;
  statusText: string;

  constructor(private route: ActivatedRoute, private router: Router, private detailService: DetailService   ) { }

  ngOnInit() {
    this.route.queryParams.subscribe((queryParam) => {
      if (queryParam.id) {
        this.detailService.fetchDetails(queryParam.id).subscribe((response1) => {
          // console.log(response1);
          // fetch Second response
          if (response1.imdb_id) {
            this.detailService.fetchSecondResponse(response1.imdb_id).subscribe((response2) => {
              this.response2Added(response2);
            });
          }
          this.response1Added(response1, queryParam);
          this.status = 1;
          this.response = true;
          this.isLoading = false;
        }, error => {
          // console.log(error);
          this.response = false;
          this.isLoading = false;
          this.status = 0;
          this.statusText = error.statusText;
        });
      }
    });

  }


  response1Added(response1: any, queryParam: any) {
    this.movieId = queryParam.id;
    this.language = response1.original_language;
    this.imagePath = response1.poster_path;
    this.runtime = response1.runtime;
    this.tagLine = response1.tagline;
    this.overView = response1.overview;
    this.releaseDate = response1.release_date;
    this.name = response1.original_title;
    if (response1.images.backdrops.length > 10) {
      for (let i = 1; i <= 10; i++) {
        this.images.push(response1.images.backdrops[i].file_path);
      }
    } else {
      for (const image of response1.images.backdrops) {
        this.images.push(image.file_path);
      }
    }
    for (const genere of response1.genres) {
      this.categories.push(genere.name);
    }
  }

  response2Added(response2: any) {
    // console.log(response2);
    this.type = response2.Type;
    this.actors = response2.Actors;
    this.ratings = [...response2.Ratings];
  }


  onDownloadClick() {
    this.router.navigate(['download'], { relativeTo: this.route, queryParamsHandling: 'preserve' });
    console.log(document.URL);
  }
}
