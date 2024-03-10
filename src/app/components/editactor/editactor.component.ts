import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {InputTextModule} from 'primeng/inputtext';
import { ImagesService } from '../../services/images.service';
import { CommonModule } from '@angular/common';
import { IActorCommand } from '../../IActorCommand';
import { ActorsServiceService } from '../../services/actors-service.service';
import { ICreateResponse } from '../../ICreateResponse';
import { IActor } from '../../IActor';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editactor',
  standalone: true,
  imports: [ReactiveFormsModule, InputTextModule, CommonModule],
  templateUrl: './editactor.component.html',
  styleUrl: './editactor.component.css'
})
export class EditactorComponent implements OnInit{
  editActorForm!:FormGroup;
  selectedFile!:File;
  imagePath!:string;
  actorPoster!:string;
  actorCommand!:IActorCommand;
  createResponse!:ICreateResponse<IActor>;
  id!:number;
  actor!:IActor;
  formData!:FormData;
  newActor!:IActorCommand;
constructor(private _imageService:ImagesService, private _actorService:ActorsServiceService, private _activatedRoute:ActivatedRoute,
  private _router:Router){

}
  ngOnInit(): void {
    this.id= parseInt(this._activatedRoute.snapshot.paramMap.get('id')!);
    this._actorService.GetActorByID(this.id).subscribe((data)=>{
      this.actor=data;
      this.editActorForm=new FormGroup({"name": new FormControl(this.actor.name, Validators.required),
      "age": new FormControl(this.actor.age, Validators.required),
      "bio": new FormControl(this.actor.bio, Validators.required)});
      this.actorPoster=this.actor.posterURL;
    })
  }
  OnImageChange(event:any){
    this.selectedFile=<File> event.target.files[0];
  }
  EditActorImageCheck(){
    if(this.selectedFile){
      this.formData=new FormData();
      this.formData.append('formFile',this.selectedFile, this.selectedFile.name);
      this._imageService.UploadImage(this.formData).subscribe((data)=>{
        this.actorPoster=data;
        this.PostNewActor();
      })
    }
    else{
      this.PostNewActor();
    }

  }
  PostNewActor(){
    this.newActor={
      name:this.editActorForm.value.name,
      age:this.editActorForm.value.age,
      bio:this.editActorForm.value.bio,
      posterURL:this.actorPoster
    }
    this._actorService.EditActor(this.id!,this.newActor).subscribe(()=>{
      this._router.navigate(["actors",this.id]);
    })
  }
  CancelForm(){
    this._router.navigate(["actors",this.id]);
  }
}
