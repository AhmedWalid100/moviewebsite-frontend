import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { IMovie } from '../../IMovie';
import { MoviesService } from '../../services/movies.service';
import { Observable } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
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
  constructor(private _moviesService:MoviesService, private router:Router){
    this.dramaMovies=[];
    this.comedyMovies=[];
  }
  ngOnInit() {
   this._moviesService.GetAllMovies().subscribe((movies)=>{
    this.dramaMovies=this._moviesService.FilterByGenre(movies.data,"Drama");
    this.comedyMovies=this._moviesService.FilterByGenre(movies.data, "Comedy");
   });
   
  }
  NavigateTo(movieID:number){
    this.router.navigate(["/movies",movieID])
  }

}
