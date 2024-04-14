import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { FormGroup, FormControlName, FormControl } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ILogin } from '../../ILogin';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  constructor(private _authService:AuthService, private location:Location, private _router:Router){

  }
  wrongCred:boolean=false;
  loginForm!:FormGroup;
  loginFormSent!:ILogin;
  ngOnInit(): void {
    if(this._authService.isUserLoggedIn()){
     this._router.navigate(['']);
    }
    this._authService.Fetch().subscribe((data)=>{
      console.log(data);
    })
    this.loginForm=new FormGroup({
      Email:new FormControl(null, Validators.required),
      Password:new FormControl(null, Validators.required)
    });
  }
  Login(){
    this.loginFormSent={
      Email:this.loginForm.value.Email,
      Password:this.loginForm.value.Password
    };
    console.log(this.loginFormSent);
    this._authService.Login(this.loginFormSent).subscribe((data)=>{
      if(data.isSuccess==false){
        this.wrongCred=true;
        return;
      }
      localStorage.setItem('jwtToken',data.token);
         //this.location.back();
         window.location.reload();
    })
  }
  LogOut(){
    this._authService.LogOut();
  }
  NavigateToRegister(){
    this._router.navigate(['register']);
  }

}
