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
import { HttpParams } from '@angular/common/http';
import { NgIf } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-actordetails',
  standalone: true,
  imports: [NgFor, ConfirmDialogModule, ButtonModule, NgIf],
  templateUrl: './actordetails.component.html',
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  styleUrl: './actordetails.component.css',
  providers:[ConfirmationService, MessageService]
})
export class ActordetailsComponent implements OnInit{
  actorMovies!:IMovie[];
  id!:number;
  actor!:IActor;
  isAdmin!:boolean;
constructor(private route:ActivatedRoute, private _movieService:MoviesService, private _actorService:ActorsServiceService, 
  private _router:Router, private confirmationService: ConfirmationService, private messageService: MessageService, 
  private _authService:AuthService){

  }
  ngOnInit(): void {
    this.isAdmin=false;
    if(this._authService.isUserLoggedIn() && this._authService.isUserAdmin()){
      this.isAdmin=true;
    }

    this.id=parseInt(this.route.snapshot.paramMap.get('id')!);
    this._actorService.GetActorByID(this.id).subscribe((data)=>{
      this.actor=data;
    });
    this._actorService.GetMoviesByActorID(this.id).subscribe((data)=>{
      this.actorMovies=data;
    })
  }
  NavigateTo(id:number){
    this._router.navigate(["/edit/actor",id]);
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
            this._actorService.DeleteActor(this.id!).subscribe(()=>{this._router.navigate(['/actors']);});
        },
        reject: () => {
            this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
        }
    });
}
}
