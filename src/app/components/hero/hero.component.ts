import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { NgFor } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgStyle } from '@angular/common';
import { IMovie } from '../../IMovie';
import { MoviesService } from '../../services/movies.service';
@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CarouselModule, NgFor, NgStyle],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css',
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
})
export class HeroComponent implements OnInit {
  itemsPerSlide = 2;
  singleSlideOffset = true;
  noWrap = false;
 
  slidesChangeMessage = '';
  movies: IMovie[];
  constructor(private _moviesService:MoviesService){
    this.movies=[];
  }
  ngOnInit() {
    this._moviesService.GetAllMovies().subscribe((data)=>{
      this.movies=this._moviesService.RandomizeMovies(data);
    })
  }
}
