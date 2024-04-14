import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-errorpage',
  standalone: true,
  imports: [],
  templateUrl: './errorpage.component.html',
  styleUrl: './errorpage.component.css'
})
export class ErrorpageComponent {
  message!:string|undefined;
  constructor(private _activatedRoute:ActivatedRoute){
    this.message=this._activatedRoute.snapshot.paramMap.get('message')?.toString();
  }

}
