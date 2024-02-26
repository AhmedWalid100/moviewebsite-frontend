import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IActor } from '../IActor';

@Injectable({
  providedIn: 'root'
})
export class ActorsServiceService {

  constructor(private http:HttpClient) {

   }
   GetAllActors():Observable<IActor[]>{
    return this.http.get<IActor[]>("https://localhost:7181/api/Actor");
   }
}
