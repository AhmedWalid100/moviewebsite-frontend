import { Component, OnInit } from '@angular/core';
import { ActorsServiceService } from '../../services/actors-service.service';
import { IActor } from '../../IActor';
import { NgFor } from '@angular/common';
import { Params } from '@angular/router';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-actorscarousel',
  standalone: true,
  imports: [NgFor],
  templateUrl: './actorscarousel.component.html',
  styleUrl: './actorscarousel.component.css'
})
export class ActorscarouselComponent implements OnInit {
  actors:IActor[];
  searchParams!:HttpParams;
  constructor(private _actorsService:ActorsServiceService){
    this.actors=[];
  }
  ngOnInit(): void {
    this.searchParams=new HttpParams(); 
    this.searchParams=this.searchParams.append('page',`1`);
    this.searchParams=this.searchParams.append('pageSize',`7`);
    this._actorsService.GetAllActors(this.searchParams).subscribe((data)=>{
      this.actors=data.data;
    })
  }

}
