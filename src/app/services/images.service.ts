import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  constructor(private http:HttpClient) {

   }

   UploadImage(image:FormData):Observable<string>{
    //const headers = new HttpHeaders().set('Content-Type', 'multipart/form-data');
    return this.http.post<string>("https://localhost:7181/api/Images",image);
   }
}
