import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MoviesComponent } from './movies/features/movies.component';

export const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'movies', component: MoviesComponent},
  // { path: 'contact' },
  // { path: 'politiquedeconfidentialite'},
  // { path: 'cgv'},
];
