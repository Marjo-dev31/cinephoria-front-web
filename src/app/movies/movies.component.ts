import { Component, inject, Signal } from '@angular/core';
import { MovieUpdateInterface } from './movie.interface';
import { MoviesService } from './movies.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { environment } from '../../environments/environment';

@Component({
    selector: 'app-movies',
    imports: [],
    templateUrl: './movies.component.html',
    styleUrl: './movies.component.css',
})
export class MoviesComponent {
    private readonly moviesService = inject(MoviesService);

    // check if it works in production
    url = `${environment.serverUrl}/uploads/`;

    movies: Signal<MovieUpdateInterface[]> = toSignal(
        this.moviesService.getAllMovies(),
        { initialValue: [] },
    );
}
