import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { IMovie } from '../../IMovie';
import { MoviesService } from '../../services/movies.service';
import { Observable } from 'rxjs';
import { HttpClientModule, HttpParams } from '@angular/common/http';
import { NgFor } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homesection',
  standalone: true,
  imports: [NgFor],
  templateUrl: './homesection.component.html',
  styleUrl: './homesection.component.css',
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  providers:[HttpClientModule]
})
export class HomesectionComponent implements OnInit {
   dramaMovies:IMovie[];
   comedyMovies:IMovie[];
   dramaSearchParams!:HttpParams;
   comedySearchParams!:HttpParams;
  constructor(private _moviesService:MoviesService, private router:Router){
    this.dramaMovies=[];
    this.comedyMovies=[];
  }
  ngOnInit() {
    this.dramaSearchParams=new HttpParams();
    this.comedySearchParams=new HttpParams();
    this.dramaSearchParams=this.dramaSearchParams.append('searchGenre','Drama');
    this.dramaSearchParams=this.dramaSearchParams.append('pageSize','20');
    this.comedySearchParams=this.comedySearchParams.append('searchGenre','Comedy');
    this.comedySearchParams=this.comedySearchParams.append('pageSize','20');
   this._moviesService.GetAllMovies(this.dramaSearchParams).subscribe((movies)=>{
    this.dramaMovies=movies.data;
   });
   this._moviesService.GetAllMovies(this.comedySearchParams).subscribe((movies)=>{
    this.comedyMovies=movies.data;
   });

   
  }
  NavigateTo(movieID:number){
    this.router.navigate(["/movies",movieID])
  }

}
