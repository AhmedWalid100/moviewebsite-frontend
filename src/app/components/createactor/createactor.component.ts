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
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
@Component({
  selector: 'app-createactor',
  standalone: true,
  imports: [ReactiveFormsModule, InputTextModule, CommonModule, NgIf],
  templateUrl: './createactor.component.html',
  styleUrl: './createactor.component.css'
})
export class CreateactorComponent implements OnInit {
 
  createActorForm!:FormGroup;
  selectedFile!:File;
  imagePath!:string;
  actorCommand!:IActorCommand;
  createResponse!:ICreateResponse<IActor>;
  constructor(private _imageService:ImagesService, private _actorService:ActorsServiceService, private _router:Router){
    
  }
  ngOnInit(): void {
    this.createActorForm=new FormGroup({
      "name": new FormControl(null, Validators.required),
      "bio": new FormControl(null, Validators.required)
    })
  }
  async CreateActor(){
    const sentImage=new FormData();
    if (this.selectedFile) {
     await sentImage.append('formFile', this.selectedFile, this.selectedFile.name);
    } else {
      alert('No Image selected!');
      return;
    }
    if(this.createActorForm.valid){

    
    this._imageService.UploadImage(sentImage).subscribe((data)=>{
      this.imagePath=data;
      this.actorCommand={
        ...this.createActorForm.value,
        posterURL:this.imagePath
      }
      this._actorService.CreateActor(this.actorCommand).subscribe((data)=>{
        this.createResponse=data;
        this._router.navigate(['/actors',this.createResponse.data.id]);
      });
    })
  }
  else{
    alert("Form not valid. Please fill the required fields");
    console.log("not valid form");
  }
  }
  OnImageChange(event:any){ 
    this.selectedFile=<File>event.target.files[0];
    console.log(this.selectedFile);
  }
  CancelForm(){
    this._router.navigate(["actors"]);
  }
  get name(){
    return this.createActorForm.get('name');
  }
  get bio(){
    return this.createActorForm.get('bio');
  }
  
}
