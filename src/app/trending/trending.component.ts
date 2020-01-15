import { fade } from '../../animations/animations';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MovieService } from '../services/movie.service';



@Component({
  selector: 'app-trending',
  templateUrl: './trending.component.html',
  styleUrls: ['./trending.component.css'],
  animations: [
    fade
  ]

})
export class TrendingComponent implements OnInit {

  movies: any = [];
  // moviesData: any;
  okStatus = null;
  message = 'something wrong';
  nextPage = 1;
  totalpages = null;
  response = true;
  isLoading = true;
  moreLoading = true;
  // error
  addMoreStatus: number;
  addMoreStatusText: string;


  constructor(private trendingService: MovieService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.trendingService.fetchTrendingMovies().subscribe(trendingMovies => {
      // console.log(trendingMovies)
      if (trendingMovies.results) {
        this.isLoading = false;
        trendingMovies.results.forEach(element => {
          this.movies.push(element)
        });
        // this.moviesData = trendingMovies;
        this.totalpages = trendingMovies.total_pages;
      }
    }, error => {
      // console.log(error)
      this.isLoading = false;
      this.response = false;
    })
  }

  addMoreTrendingMovies() {
    this.moreLoading = true;
    this.addMoreStatus = 1
    this.nextPage += 1;
    if (this.nextPage <= this.totalpages) {
      this.trendingService.fetchedMoreTrendingMovies(this.nextPage).subscribe(data => {
        // console.log(data)
        this.addMoreStatus = 1;
        this.moreLoading = false;
        this.movies.push(...data.results);
      }, error => {
        // console.log(error)
        this.moreLoading = false;
        this.addMoreStatus = 0;
        this.addMoreStatusText = error.statusText;
      })
    }
  }

  getDetailsOfSingleMovie(movie) {
    this.router.navigate([movie.title || movie.original_name || movie.original_title],
      { relativeTo: this.route, queryParams: { id: movie.id } });
  }
}
