import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { FormGroup, FormControlName, FormControl } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { IRegister } from '../../IRegister';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{
  constructor(private _authService:AuthService, private _router:Router){

  }
  registerForm!:FormGroup;
  registerFormSent!:IRegister;
  ngOnInit(): void {
    if(this._authService.isUserLoggedIn()){
      this._router.navigate(['']);
    }
    this.registerForm=new FormGroup({
      Username:new FormControl(null, Validators.required),
      Email:new FormControl(null, [Validators.required, Validators.email]),
      Password:new FormControl(null, Validators.required),
      ConfirmPassword: new FormControl(null, Validators.required)
    })
  }
  Register(){
    if(this.registerForm.value.Password!=this.registerForm.value.ConfirmPassword){
      alert("Passwords dont match.");
      return;
    }
    if(this.registerForm.get('Email')?.errors?.['email']){
      alert('Please enter a valid email');
      return;
    }
    if(!this.registerForm.valid)
    {
      alert("Please complete the form and fill the 4 fields.");
      return;
    }

    this.registerFormSent={
      Username:this.registerForm.value.Username,
      Email:this.registerForm.value.Email,
      Password:this.registerForm.value.Password,
      ConfirmPassword:this.registerForm.value.ConfirmPassword
    };
    this._authService.Register(this.registerFormSent).subscribe((data)=>{
      if(data.isSuccess==false&&data.message=="email already exists"){
        alert("Email already exists");
        return;
      }
      if(data.isSuccess==false&&data.message=="name already exists"){
        alert("Name already exists");
        return;
      }
      localStorage.setItem("jwtToken",data.token);
      location.reload();
    })
  }

}
