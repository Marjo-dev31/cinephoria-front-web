import {
    Component,
    computed,
    effect,
    inject,
    signal,
    Signal,
} from '@angular/core';
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
    public readonly url = `${environment.serverUrl}/uploads/`;

    public searchGenre = signal('');

    public readonly movies: Signal<MovieUpdateInterface[]> = toSignal(
        this.moviesService.getAllMovies(),
        { initialValue: [] },
    );

    movieeffect = effect(() => console.log(this.movies()));

    // make filter for cinema and date when session service created
    moviesFiltered = computed(() =>
        this.movies().filter((movie) =>
            movie.genre.title.includes(this.searchGenre()),
        ),
    );

    onSearchGenreUpdated(genre: string) {
        this.searchGenre.set(genre);
    }
}
