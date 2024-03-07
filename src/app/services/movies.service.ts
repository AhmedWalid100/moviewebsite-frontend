import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IMovie } from '../IMovie';
import { Observable } from 'rxjs';
import { IMovieData } from '../IMovieData';
import { IMovieCommand } from '../IMovieCommand';
import { ICreateResponse } from '../ICreateResponse';
import { IActor } from '../IActor';

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
  UpdateMovie(id:number, movie:IMovieCommand):Observable<ICreateResponse<number>>{
    return this.http.put<ICreateResponse<number>>(`https://localhost:7181/api/Movie/${id}`, movie);
  }
  DeleteMovie(id:number):Observable<string>{
    return this.http.delete<string>(`https://localhost:7181/api/Movie/${id}`);
  }
  AddActorToMovie(movieID:number, actorID:number):Observable<any>{
    return this.http.put<any>(`https://localhost:7181/api/Movie/AddActorToMovie?movieID=${movieID}&actorID=${actorID}`,null);
  }
  GetMovieActorsByMovieID(movieID:number):Observable<IActor[]>{
    return this.http.get<IActor[]>(`https://localhost:7181/api/Movie/GetMovieActors/${movieID}`);
  }
  DeleteMovieActor(movieID:number, actorID:number):Observable<any>{
    return this.http.delete<any>(`https://localhost:7181/api/Movie/DeleteMovieActor?movieID=${movieID}&actorID=${actorID}`);
  }
}
