import { Component } from '@angular/core';
import { PaginatorModule } from 'primeng/paginator';

interface PageEvent {
  first: number;
  rows: number;
  page: number;
  pageCount: number;
}
@Component({
  selector: 'app-allmovies',
  standalone: true,
  imports: [PaginatorModule],
  templateUrl: './allmovies.component.html',
  styleUrl: './allmovies.component.css'
})

export class AllmoviesComponent {
  first: number = 0;
  pageCount:number=5;
  rows: number = 10;
  
  onPageChange(event: PageEvent) {
   console.log(event);
}
}
