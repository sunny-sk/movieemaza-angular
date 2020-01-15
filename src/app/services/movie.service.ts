import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  SearchedMovieSubject = new Subject<any>();

  constructor(private http: HttpClient) { }

  fetchTrendingMovies() {
    return this.http.get(`https://api.themoviedb.org/3/trending/all/day?api_key=${environment.themoviedbApiKey}`, {
    }).pipe(map(moviesData => {
      let transformedData: any = moviesData;
      return transformedData;
    }))
  }

  fetchedMoreTrendingMovies(nextPage: number) {
    return this.http.get(`https://api.themoviedb.org/3/trending/all/day?api_key=${environment.themoviedbApiKey}&page=${nextPage}`).pipe(map(moviesData => {
      let transformedData: any = moviesData;
      return transformedData;
    }))
  }

  fetchSearchMovie(searchMovieByName?: string) {
    return this.http.get(`https://api.themoviedb.org/3/search/movie?api_key=${environment.themoviedbApiKey}&language=en-US&query=${searchMovieByName}`)
      .pipe(map((data) => {
        let transformedData: any = data;
        return transformedData;
      }))
  }

  fetchMoreSearchMovies(nextPage: number, searchMovieByName: string) {
    return this.http.get(`https://api.themoviedb.org/3/search/movie?api_key=${environment.themoviedbApiKey}&language=en-US&query=${searchMovieByName}&page=${nextPage}`)
      .pipe(map(moviesData => {
        let transformedData: any = moviesData;
        return transformedData;
      }))
  }

  

}
