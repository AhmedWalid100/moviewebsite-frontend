import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IRegister } from '../IRegister';
import { Observable } from 'rxjs';
import { ILogin } from '../ILogin';
import { IRegisterLoginResponse } from '../IRegisterLoginResponse';
import { jwtDecode } from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
decodedToken:any;
  constructor(private http:HttpClient) {
    
   }

  Register(registerForm:IRegister):Observable<IRegisterLoginResponse>{
    return this.http.post<IRegisterLoginResponse>("https://localhost:7181/api/Auth/auth/register",registerForm);
  }
  Login(loginForm:ILogin):Observable<IRegisterLoginResponse>{
   return this.http.post<IRegisterLoginResponse>("https://localhost:7181/api/Auth/auth/login", loginForm);

  }
  LogOut(){
    localStorage.removeItem("jwtToken");
    this.http.get("https://localhost:7181/api/Auth/auth/logout").subscribe();
    window.location.reload();

  }
  Fetch():Observable<any>{
    return this.http.get<any>("https://localhost:7181/api/Auth/auth/user");
  }

  isUserLoggedIn():boolean{
    if(localStorage.getItem("jwtToken")){
      return true;
    }
    else{
      return false;
    }
  }
  TokenDecoding():any{
    var token=localStorage.getItem("jwtToken");
    this.decodedToken=jwtDecode(token!);
    return(this.decodedToken);
  }

  isTokenExpired(){
    this.decodedToken=this.TokenDecoding();
    if(this.decodedToken==null){
      return false;
    }
    var expirationDate=this.decodedToken.exp*1000;
    var now=new Date().getTime();
    console.log(expirationDate!<now);
     return expirationDate! < now;
  } 

  isUserAdmin():boolean{
    this.decodedToken=this.TokenDecoding();
    var isAdmin=false;
    if (!this.decodedToken.role)
    return false;
    this.decodedToken.role.forEach((role: string) => {
      if(role.toLowerCase()=="admin")
        isAdmin=true;
      
    });
    if(isAdmin){
      return true;
    }
    else{
    return false;
    }
  }
}
