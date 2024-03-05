import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IMovie } from '../IMovie';
import { Observable } from 'rxjs';
import { IMovieData } from '../IMovieData';
import { IMovieCommand } from '../IMovieCommand';
import { ICreateResponse } from '../ICreateResponse';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {


  constructor(private http:HttpClient) { }

   GetAllMovies(searchParams?:HttpParams):Observable<IMovieData>{
    if (searchParams){
      return this.http.get<IMovieData>("https://localhost:7181/api/Movie",{params:searchParams});
    }
    else{
      return this.http.get<IMovieData>("https://localhost:7181/api/Movie?pageSize=10");
    }

  }
  RandomizeMovies(movies:IMovie[]):IMovie[]{
    return movies.sort(() => 0.5 - Math.random());
  }
  FilterByGenre(movies:IMovie[], genre:string):IMovie[]{
    return movies.filter(movie=>movie.genreDTO.primaryGenre==genre);
  }
  GetMovieByID(id:number):Observable<IMovie>{
    return this.http.get<IMovie>(`https://localhost:7181/api/Movie/${id}`);
  }
  PostMovie(movie:IMovieCommand):Observable<ICreateResponse<IMovie>>{
    return this.http.post<ICreateResponse<IMovie>>("https://localhost:7181/api/Movie",movie);
  }
}
