import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {InputTextModule} from 'primeng/inputtext';

@Component({
  selector: 'app-createactor',
  standalone: true,
  imports: [ReactiveFormsModule, InputTextModule],
  templateUrl: './createactor.component.html',
  styleUrl: './createactor.component.css'
})
export class CreateactorComponent implements OnInit {
  createActorForm!:FormGroup;
  ngOnInit(): void {
    this.createActorForm=new FormGroup({
      "name": new FormControl(null, Validators.required),
      "age": new FormControl(null, Validators.required),
      "bio": new FormControl(null, Validators.required),
      "posterURL": new FormControl(null, Validators.required)
    })
  }
  CreateActor(){
    if(this.createActorForm.valid==true){
      console.log(this.createActorForm.value);
    }

    
  }
  
}
