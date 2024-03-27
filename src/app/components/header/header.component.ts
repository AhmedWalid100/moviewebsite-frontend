import { Component, OnInit } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { interval, map } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbarModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  user!:string;
  decodedToken!:any;
  ngOnInit(): void {
   interval(60000).pipe(map(() =>{
      if(this._authService.isTokenExpired()){
        localStorage.removeItem("jwtToken");
        this.user="login";
        this._router.navigate(['login']);
      }
    } )).subscribe();
    if(this._authService.isUserLoggedIn()){
      this.decodedToken=this._authService.TokenDecoding();
      this.user=""+this.decodedToken.sub;
    }
    else{
      this.user="Login"
    }


  }
  constructor(private _router:Router, private _authService:AuthService){
   
  }

  NavigateTo(dest:string){
    this._router.navigate([dest]);
  }

  UserNavigation(){
    if(this._authService.isUserLoggedIn()){
      this._authService.LogOut();
    }
    else{
      this._router.navigate(['login']);
    }

  }

}
