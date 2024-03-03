import { Component, OnInit } from '@angular/core';
import { ActorsServiceService } from '../../services/actors-service.service';
import { IActor } from '../../IActor';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-actorscarousel',
  standalone: true,
  imports: [NgFor],
  templateUrl: './actorscarousel.component.html',
  styleUrl: './actorscarousel.component.css'
})
export class ActorscarouselComponent implements OnInit {
  actors:IActor[];
  constructor(private _actorsService:ActorsServiceService){
    this.actors=[];
  }
  ngOnInit(): void {
    this._actorsService.GetAllActors().subscribe((data)=>{
      this.actors=data.data;
    })
  }

}
