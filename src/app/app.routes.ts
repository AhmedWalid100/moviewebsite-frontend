import { Routes } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { HeroComponent } from './components/hero/hero.component';
import { HomesectionComponent } from './components/homesection/homesection.component';
import { MoviedetailsComponent } from './components/moviedetails/moviedetails.component';
import { ActorscarouselComponent } from './components/actorscarousel/actorscarousel.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { CreateactorComponent } from './components/createactor/createactor.component';
import { CreatemovieComponent } from './components/createmovie/createmovie.component';
import { AllmoviesComponent } from './components/allmovies/allmovies.component';
import { AllactorsComponent } from './components/allactors/allactors.component';
import { EditmovieComponent } from './components/editmovie/editmovie.component';



export const routes: Routes = [{path:"",component:HomepageComponent},
{path:"movies/:id",component:MoviedetailsComponent},
{path:"create/actor",component:CreateactorComponent},
{path:"create/movie",component:CreatemovieComponent},
{path:"movies",component:AllmoviesComponent},
{path:"actors",component:AllactorsComponent},
{path:"edit/movie/:id",component:EditmovieComponent}];
