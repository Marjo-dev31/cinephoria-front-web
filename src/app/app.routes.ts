import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MoviesComponent } from './movies/features/movies.component';
import { PrivacyPolicyComponent } from './privacy-policy/features/privacy-policy.component';
import { GtcComponent } from './gtc/features/gtc.component';
import { ShowingComponent } from './showing/features/showing.component';
import { BackofficeComponent } from './user/features/user-backoffice/shared-backoffice/backoffice.component';
import { RoomBackofficeComponent } from './room/features/room-backoffice/room.backoffice.component';
import { MovieBackofficeComponent } from './movies/features/moviebackoffice/movie.backoffice.component';
import { ShowingBackofficeComponent } from './showing/features/showing-backoffice/showing-backoffice.component';
import { CreateEmployeeComponent } from './user/features/user-backoffice/create-employee/create-employee.component';
import { ReviewBackofficeComponent } from './reviews/feature/review-backoffice/review-backoffice.component';
import { MySpaceComponent } from './user/features/user-backoffice/my-space/my-space.component';
import { SignUpComponent } from './user/features/sign-up/sign-up.component';
import { LoginComponent } from './user/features/login/login.component';
import { DashboardComponent } from './movies/features/moviebackoffice/dashboard/dashboard.component';
import { ErrorComponent } from './shared/component/error/error.component';
import { ForbiddenComponent } from './shared/component/error/forbidden.component';
import { authGuard } from './shared/guards/auth.guard';
import { roleGuard } from './shared/guards/role.guard';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'movies', component: MoviesComponent },
    { path: 'reservation', component: ShowingComponent },
    { path: 'login', component: LoginComponent },
    {
        path: 'backoffice',
        component: BackofficeComponent,
        canActivate: [authGuard, roleGuard],
        canActivateChild: [authGuard, roleGuard],
        data: { expectedRoles: ['admin', 'employee'] },
        children: [
            {
                path: 'room',
                component: RoomBackofficeComponent,
                data: { expectedRoles: ['admin', 'employee'] },
            },
            {
                path: 'showing',
                component: ShowingBackofficeComponent,
                data: { expectedRoles: ['admin', 'employee'] },
            },
            {
                path: 'movie',
                component: MovieBackofficeComponent,
                data: { expectedRoles: ['admin', 'employee'] },
            },
            {
                path: 'employeeaccount',
                component: CreateEmployeeComponent,
                data: { expectedRoles: ['admin'] },
            },
            {
                path: 'review',
                component: ReviewBackofficeComponent,
                data: { expectedRoles: ['employee'] },
            },
            {
                path: 'dashboard',
                component: DashboardComponent,
                data: { expectedRoles: ['admin'] },
            },
        ],
    },
    { path: 'signup', component: SignUpComponent },
    { path: 'myspace', component: MySpaceComponent, canActivate: [authGuard] },
    // { path: 'contact' },
    // { path: 'passwordforgot' },
    { path: 'politiquedeconfidentialite', component: PrivacyPolicyComponent },
    { path: 'cgv', component: GtcComponent },
    { path: 'error', component: ErrorComponent },
    { path: 'forbidden', component: ForbiddenComponent },
    { path: '**', redirectTo: '', pathMatch: 'full' },
];
