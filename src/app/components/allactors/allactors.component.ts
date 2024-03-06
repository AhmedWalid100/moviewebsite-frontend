import { Component, Input, importProvidersFrom, input, viewChild } from '@angular/core';
import { PaginatorModule } from 'primeng/paginator';
import { ActorsServiceService } from '../../services/actors-service.service';
import { HttpParams } from '@angular/common/http';
import { NgFor } from '@angular/common';
import { InputText, InputTextModule } from 'primeng/inputtext';
import { NgIf } from '@angular/common';
import { RadioButtonModule } from 'primeng/radiobutton';
import { IActor } from '../../IActor';

interface PageEvent {
  first: number;
  rows: number;
  page: number;
  pageCount: number;
}

@Component({
  selector: 'app-allactors',
  standalone: true,
  imports: [PaginatorModule, NgFor, InputTextModule, NgIf, RadioButtonModule],
  templateUrl: './allactors.component.html',
  styleUrl: './allactors.component.css'
})
export class AllactorsComponent {
  ignorePageReset:boolean=false;
  refreshBoolean:boolean=true;
  first: number = 0;
  pageCount:number=5;
  rows: number = 10;
  _pageSize:number;
  _page:number;
  totalRecordsCount!:number;
  actors!:IActor[];
  searchParams!:HttpParams;
  searchValue!: string;
  constructor(private _actorService:ActorsServiceService){
    this._pageSize=6;
    this._page=0;
    this.fetchActors();
  }
  onPageChange(event: PageEvent) {
   console.log(event);
   this._page=event.page;
   this.ignorePageReset=true;
   this.fetchActors();
}
onSearchChange(){
  this.ignorePageReset=false;
  this.fetchActors();
}
fetchActors(){
  
  this.searchParams=new HttpParams();
  if(this.searchValue){
    this.searchParams=this.searchParams.append('searchName',`${this.searchValue}`);
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
  this._actorService.GetAllActors(this.searchParams).subscribe((data)=>{
    this.totalRecordsCount=data.count;
    this.actors=data.data;
    console.log(data);
  });
}
}
