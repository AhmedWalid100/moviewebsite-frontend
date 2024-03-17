import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { FormGroup, FormControlName, FormControl } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ILogin } from '../../ILogin';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  constructor(private _authService:AuthService){

  }
  loginForm!:FormGroup;
  loginFormSent!:ILogin;
  ngOnInit(): void {
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
      console.log(data);
      localStorage.setItem('jwtToken',data.token);
    })
  }
  LogOut(){
    this._authService.LogOut().subscribe(()=>{
      console.log("logged out");
    });
  }

}
