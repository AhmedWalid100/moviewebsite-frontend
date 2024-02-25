import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IMovie } from '../IMovie';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {


  constructor(private http:HttpClient) { }
   GetAllMovies():Observable<IMovie[]>{
    return this.http.get<IMovie[]>("https://localhost:7181/api/Movie");
  }
  RandomizeMovies(movies:IMovie[]):IMovie[]{
    return movies.sort(() => 0.5 - Math.random());
  }
  FilterByGenre(movies:IMovie[], genre:string):IMovie[]{
    return movies.filter(movie=>movie.genreDTO.primaryGenre==genre);
  }
}
