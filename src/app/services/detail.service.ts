import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from './../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class DetailService {

  constructor(private http: HttpClient) { }

  fetchDetails(id) {
    return this.http
      .get(`https://api.themoviedb.org/3/movie/${id}?api_key=${environment.themoviedbApiKey}&append_to_response=videos,images`)
      .pipe(map((data1) => {
        
        let response1: any = data1
        return response1;
      }))
  }


  fetchSecondResponse(imdb_id) {
    return this.http
      .get(`https://www.omdbapi.com/?apikey=${environment.omdbApiKey}&i=${imdb_id}`)
      .pipe(map((data2) => {
        
        let response2: any = data2
        return response2;
      }))
  }



}



