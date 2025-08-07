import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MoviesComponent } from './movies/features/movies.component';
import { PrivacyPolicyComponent } from './privacy-policy/features/privacy-policy.component';
import { GtcComponent } from './gtc/features/gtc.component';
import { ShowingComponent } from './showing/features/showing.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'movies', component: MoviesComponent },
    { path: 'reservation', component: ShowingComponent },
    // { path: 'contact' },
    { path: 'politiquedeconfidentialite', component: PrivacyPolicyComponent },
    { path: 'cgv', component: GtcComponent },
];
