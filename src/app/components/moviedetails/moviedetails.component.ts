import { Component,CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IMovie } from '../../IMovie';
import { MoviesService } from '../../services/movies.service';
import { IActor } from '../../IActor';
import { ActorsServiceService } from '../../services/actors-service.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-moviedetails',
  standalone: true,
  imports: [NgFor],
  templateUrl: './moviedetails.component.html',
  styleUrl: './moviedetails.component.css',
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class MoviedetailsComponent implements OnInit {
  id:number|null;
  movie!:IMovie;
  movieActors:IActor[];
  constructor(private route:ActivatedRoute, private _movieService:MoviesService, private _actorService:ActorsServiceService){
    this.id=null;
    this.movieActors=[];
  }
  ngOnInit(): void {
    
    this.id=parseInt(this.route.snapshot.paramMap.get('id')!);
    this._movieService.GetMovieByID(this.id).subscribe((data)=>{
      this.movie=data;
    });
    this._actorService.GetAllActors().subscribe((data)=>{
      this.movieActors=data;
    })
    
  }
  
}
