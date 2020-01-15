import { Component, OnInit } from '@angular/core';
import { MovieService } from '../services/movie.service';
import { Router, ActivatedRoute } from '@angular/router';
import { fade } from '../../animations/animations';
@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css'],
  animations:[
    fade
  ]
})
export class MoviesComponent implements OnInit {
  movies: any = [];
  // moviesData: any;
  response: boolean = true;
  okStatus = 1;
  message: string = 'something wrong'
  nextPage = 1;
  totalpages = null;
  isLoading: boolean = true;
  moreLoading = false;
  resultFound: boolean = true;
  searchMovieByName = 'home'

  // error
  addMoreStatus: number;
  addMoreStatusText: string;

  constructor(private movieService: MovieService,
    private router: Router,
    private route: ActivatedRoute) { }


  ngOnInit() {
    if(this.searchMovieByName !== ""){
      this.fetchMovies();
    }
    this.movieService.SearchedMovieSubject.subscribe((data) => {
      this.searchMovieByName = data;
      this.movies = [];
      this.fetchMovies()
    })
  }

  fetchMovies() {
    this.isLoading = true;
    this.movieService.fetchSearchMovie(this.searchMovieByName).subscribe((searchMovieData) => {
      // console.log(searchMovieData)
      if (searchMovieData.results.length > 0) {
        this.isLoading = false;
        this.okStatus = 1;
        this.movies.push(...searchMovieData.results)
        // this.moviesData = searchMovieData;
        this.totalpages = searchMovieData.total_pages;
      } else {
        this.isLoading = false;
        this.resultFound = false;
      }
    }, error => {
      // console.log(error);
      this.okStatus = 0;
      this.isLoading = false;
      this.response = false;
    }
    )
  }

  addMoreSearchMovies() {
    this.moreLoading = true;
    this.addMoreStatus = 1;
    this.nextPage += 1
    if (this.nextPage <= this.totalpages) {
      this.movieService.fetchMoreSearchMovies(this.nextPage, this.searchMovieByName).subscribe(data => {
        // console.log(data)
        this.moreLoading = false
        this.addMoreStatus = 1;
        this.movies.push(...data.results);
      }, error => {
        // console.log(error)
        this.addMoreStatus = 0;
        this.moreLoading = false;
        this.addMoreStatusText = error.statusText
      })
    }
  }

  getDetailsOfSingleMovie(movie) {
    this.router.navigate([movie.title || movie.original_name || movie.original_title],
      { relativeTo: this.route, queryParams: { id: movie.id } });
  }

}
