import { Component, viewChild } from '@angular/core';
import { PaginatorModule } from 'primeng/paginator';
import { MoviesService } from '../../services/movies.service';
import { HttpParams } from '@angular/common/http';
import { IMovie } from '../../IMovie';
import { NgFor } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { NgIf } from '@angular/common';
import { RadioButtonModule } from 'primeng/radiobutton';
import { Router } from '@angular/router';

interface PageEvent {
  first: number;
  rows: number;
  page: number;
  pageCount: number;
}
@Component({
  selector: 'app-allmovies',
  standalone: true,
  imports: [PaginatorModule, NgFor, InputTextModule, NgIf,RadioButtonModule],
  templateUrl: './allmovies.component.html',
  styleUrl: './allmovies.component.css'
})

export class AllmoviesComponent {
  genre:string="All";
  ignorePageReset:boolean=false;
  refreshBoolean:boolean=true;
  first: number = 0;
  pageCount:number=5;
  rows: number = 10;
  _pageSize:number;
  _page:number;
  totalRecordsCount!:number;
  movies!:IMovie[];
  searchParams!:HttpParams;
  searchValue!: string;
  constructor(private _movieService:MoviesService, private _router:Router){
    this._pageSize=6;
    this._page=0;
    this.fetchMovies();
  }
  onPageChange(event: PageEvent) {
   console.log(event);
   this._page=event.page;
   this.ignorePageReset=true;
   this.fetchMovies();
}
onSearchChange(){
  this.ignorePageReset=false;
  this.fetchMovies();
}
onRadioChange(){
  this.ignorePageReset=false;
  this.fetchMovies();
}
fetchMovies(){
  
  this.searchParams=new HttpParams();
  if(this.searchValue){
    this.searchParams=this.searchParams.append('searchTitle',`${this.searchValue}`);
    if(!this.ignorePageReset){
      this._page=0;
      this.refreshBoolean=false;
      setTimeout(() => {
        this.refreshBoolean = true; 
      }, 2);
    }

  }
  if(this.genre!="All"){
    this.searchParams=this.searchParams.append('searchGenre',`${this.genre}`);
    if(!this.ignorePageReset){
      this._page=0;
      this.refreshBoolean=false;
      setTimeout(() => {
        this.refreshBoolean = true; 
      }, 2);
    }
  }
  this.searchParams=this.searchParams.append('page',`${this._page+1}`);
  this.searchParams=this.searchParams.append('pageSize',`${this._pageSize}`);
  this._movieService.GetAllMovies(this.searchParams).subscribe((data)=>{
    this.totalRecordsCount=data.count;
    this.movies=data.data;
    console.log(data);
  });
}
NavigateTo(movieID:number){
  this._router.navigate(["/movies",movieID]);
}
NavigateToLink(url:string){
  this._router.navigate([url]);
}

}
