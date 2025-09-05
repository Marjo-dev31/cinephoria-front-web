import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MoviesComponent } from './movies/features/movies.component';
import { PrivacyPolicyComponent } from './privacy-policy/features/privacy-policy.component';
import { GtcComponent } from './gtc/features/gtc.component';
import { ShowingComponent } from './showing/features/showing.component';
import { BackofficeComponent } from './shared/component/backoffice/backoffice.component';
import { RoomBackofficeComponent } from './room/features/room-backoffice/room.backoffice.component';
import { MovieBackofficeComponent } from './movies/features/moviebackoffice/movie.backoffice.component';
import { ShowingBackofficeComponent } from './showing/features/showing-backoffice/showing-backoffice.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'movies', component: MoviesComponent },
    { path: 'reservation', component: ShowingComponent },
    // { path: 'login' },
    {
        path: 'backoffice',
        component: BackofficeComponent,
        children: [
            { path: 'room', component: RoomBackofficeComponent },
            { path: 'showing', component: ShowingBackofficeComponent },
            { path: 'movie', component: MovieBackofficeComponent },
            { path: 'creationaccount', component: HomeComponent },
            { path: 'review', component: HomeComponent },
            { path: 'dashboard', component: HomeComponent },
        ],
    },
    { path: 'myspace', component: HomeComponent },
    // { path: 'contact' },
    { path: 'politiquedeconfidentialite', component: PrivacyPolicyComponent },
    { path: 'cgv', component: GtcComponent },
    { path: '**', component: HomeComponent },
];
