import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IActor } from '../IActor';
import { IActorCommand } from '../IActorCommand';
import { IActorData } from '../IActorData';
import { ICreateResponse } from '../ICreateResponse';
import { Params } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ActorsServiceService {

  constructor(private http:HttpClient) {

   }
   GetAllActors(searchParams?:HttpParams):Observable<IActorData>{
    if(searchParams){
      return this.http.get<IActorData>("https://localhost:7181/api/Actor",{params:searchParams});
    }
    else{
      return this.http.get<IActorData>("https://localhost:7181/api/Actor");
    }
   }
   CreateActor(actor:IActorCommand):Observable<ICreateResponse<IActor>>{
    return this.http.post<ICreateResponse<IActor>>("https://localhost:7181/api/Actor",actor);
   }
}
