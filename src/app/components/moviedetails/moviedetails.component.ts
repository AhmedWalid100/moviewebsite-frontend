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
import { MultiSelectModule } from 'primeng/multiselect';
import { FormControl, FormControlName, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpParams } from '@angular/common/http';
import { NgIf } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-moviedetails',
  standalone: true,
  imports: [NgFor, ConfirmDialogModule, ButtonModule, MultiSelectModule, ReactiveFormsModule, NgIf],
  templateUrl: './moviedetails.component.html',
  styleUrl: './moviedetails.component.css',
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  providers:[ConfirmationService, MessageService]
})
export class MoviedetailsComponent implements OnInit {
  movieActors!:IActor[];
  refreshBoolean:boolean=true;
  id:number|null;
  movie!:IMovie;
  movieActorsOptions:IActor[];
  movieActorsOptionsBeforeFilteration:IActor[];
  movieActorsForm!: FormGroup;
  searchParams!:HttpParams;
  isAdmin!:boolean;
  constructor(private route:ActivatedRoute, private _movieService:MoviesService, private _actorService:ActorsServiceService, 
    private _router:Router, private confirmationService: ConfirmationService,
     private messageService: MessageService, private _authService:AuthService){
    this.id=null;
    this.movieActorsOptions=[];
    this.movieActorsOptionsBeforeFilteration=[];
  }
  ngOnInit(): void {
    this.isAdmin=false;
    if(this._authService.isUserLoggedIn() && this._authService.isUserAdmin()){
      this.isAdmin=true;
    }
    this.searchParams=new HttpParams();
    this.searchParams=this.searchParams.append('page','1');
    this.searchParams=this.searchParams.append('pageSize','1000');

  this.movieActorsForm = new FormGroup({
      selectedCities: new FormControl<IActor[] | null>(null)
  });
    this.id=parseInt(this.route.snapshot.paramMap.get('id')!);
    this._movieService.GetMovieByID(this.id).subscribe((data)=>{
      this.movie=data;
    });
    this._actorService.GetAllActors(this.searchParams).subscribe((response)=>{
      this.movieActorsOptionsBeforeFilteration=response.data;
      this.GetMovieActors();
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
onMultiSelectSubmit(){
  if(!this.movieActorsForm.value.selectedCities)
  {
    alert("Please select actors to add to the movie.");
    return;
  }
  console.log(this.movieActorsForm.value.selectedCities);
  this.movieActorsForm.value.selectedCities.forEach((element: { id: string; }) => {
    this._movieService.AddActorToMovie(this.id!,parseInt(element.id)).subscribe(()=>  {
      this.GetMovieActors();
    });
  });
  this.movieActorsForm.reset();
  this.refreshBoolean=false;
  setTimeout(() => {
    this.refreshBoolean=true;
  }, 190);


}
GetMovieActors(){
  this._movieService.GetMovieActorsByMovieID(this.id!).subscribe((data)=>{
    this.movieActors=data;
    this.movieActorsOptions = this.movieActorsOptionsBeforeFilteration.filter(obj => this.movieActors.findIndex(item =>  JSON.stringify(item) === JSON.stringify(obj)) === -1);
  })
}
 DeleteMovieActor(actorID:number){
  this._movieService.DeleteMovieActor(this.id!,actorID).subscribe(()=>{
    this.GetMovieActors();
    this.refreshBoolean=false;
    setTimeout(() => {
      this.refreshBoolean=true;
    }, 50);
  });
 } 
}
