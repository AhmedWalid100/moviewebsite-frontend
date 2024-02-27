import { Routes } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { HeroComponent } from './components/hero/hero.component';
import { HomesectionComponent } from './components/homesection/homesection.component';
import { MoviedetailsComponent } from './components/moviedetails/moviedetails.component';
import { ActorscarouselComponent } from './components/actorscarousel/actorscarousel.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { CreateactorComponent } from './components/createactor/createactor.component';



export const routes: Routes = [{path:"",component:HomepageComponent},
{path:"movies/:id",component:MoviedetailsComponent},
{path:"create/actor",component:CreateactorComponent}];
