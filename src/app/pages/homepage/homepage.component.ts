import { Component } from '@angular/core';
import { HeroComponent } from '../../components/hero/hero.component';
import { HomesectionComponent } from '../../components/homesection/homesection.component';
import { ActorscarouselComponent } from '../../components/actorscarousel/actorscarousel.component';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [HeroComponent,HomesectionComponent,ActorscarouselComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {

}
