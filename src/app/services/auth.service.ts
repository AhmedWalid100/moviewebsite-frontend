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

  constructor(private http:HttpClient) {
    
   }

  Register(registerForm:IRegister):Observable<IRegisterLoginResponse>{
    return this.http.post<IRegisterLoginResponse>("https://localhost:7181/api/Auth/auth/register",registerForm);
  }
  Login(loginForm:ILogin):Observable<IRegisterLoginResponse>{
   return this.http.post<IRegisterLoginResponse>("https://localhost:7181/api/Auth/auth/login", loginForm);
  }
  LogOut(){
    return this.http.get<any>("https://localhost:7181/api/Auth/auth/logout");
  }
  Fetch():Observable<any>{
    return this.http.get<any>("https://localhost:7181/api/Auth/auth/user");
  }
  isTokenExpired(){
    var token=localStorage.getItem("jwtToken");
    if(!token){
      return true;
    }
    var decodedToken=jwtDecode(token);
     
  }

}
