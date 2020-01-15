import { Component } from '@angular/core';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent{

  searchMovieByName:string = '';
  constructor(private movieService : MovieService) { }


  onSearchMovie(){
  
    if(this.searchMovieByName === ''){
      this.movieService.SearchedMovieSubject.next("home");
    }else{
      this.movieService.SearchedMovieSubject.next(this.searchMovieByName);
    }
  }

}
