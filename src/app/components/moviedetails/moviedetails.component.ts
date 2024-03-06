import { Component,CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IMovie } from '../../IMovie';
import { MoviesService } from '../../services/movies.service';
import { IActor } from '../../IActor';
import { ActorsServiceService } from '../../services/actors-service.service';
import { NgFor } from '@angular/common';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
import { Button, ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
@Component({
  selector: 'app-moviedetails',
  standalone: true,
  imports: [NgFor, ConfirmDialogModule, ButtonModule],
  templateUrl: './moviedetails.component.html',
  styleUrl: './moviedetails.component.css',
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  providers:[ConfirmationService, MessageService]
})
export class MoviedetailsComponent implements OnInit {
  id:number|null;
  movie!:IMovie;
  movieActors:IActor[];
  constructor(private route:ActivatedRoute, private _movieService:MoviesService, private _actorService:ActorsServiceService, 
    private _router:Router, private confirmationService: ConfirmationService, private messageService: MessageService){
    this.id=null;
    this.movieActors=[];
  }
  ngOnInit(): void {
    
    this.id=parseInt(this.route.snapshot.paramMap.get('id')!);
    this._movieService.GetMovieByID(this.id).subscribe((data)=>{
      this.movie=data;
    });
    this._actorService.GetAllActors().subscribe((response)=>{
      this.movieActors=response.data;
    })
    
  }
  NavigateTo(id:number){
    this._router.navigate(["/edit/movie",id]);
  }
  confirm2(event: Event) {
    this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: 'Do you want to delete this record?',
        header: 'Delete Confirmation',
        icon: 'pi pi-info-circle',
        acceptButtonStyleClass:"p-button-danger p-button-text",
        rejectButtonStyleClass:"p-button-text p-button-text",
        acceptIcon:"none",
        rejectIcon:"none",

        accept: () => {
            this._movieService.DeleteMovie(this.id!).subscribe((data)=>{this._router.navigate(['/movies']);});
        },
        reject: () => {
            this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
        }
    });
}
  
}
