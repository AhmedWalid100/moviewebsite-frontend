import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { FormGroup, FormControlName, FormControl } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { IRegister } from '../../IRegister';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{
  constructor(private _authService:AuthService){

  }
  registerForm!:FormGroup;
  registerFormSent!:IRegister;
  ngOnInit(): void {
    this.registerForm=new FormGroup({
      Username:new FormControl(null, Validators.required),
      Email:new FormControl(null, Validators.required),
      Password:new FormControl(null, Validators.required),
      ConfirmPassword: new FormControl(null, Validators.required)
    })
  }
  Register(){
    this.registerFormSent={
      Username:this.registerForm.value.Username,
      Email:this.registerForm.value.Email,
      Password:this.registerForm.value.Password,
      ConfirmPassword:this.registerForm.value.ConfirmPassword
    };
    this._authService.Register(this.registerFormSent).subscribe((data)=>{
      localStorage.setItem("jwtToken",data.token);
    })
  }

}
