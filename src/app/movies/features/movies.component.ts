import {
    Component,
    computed,
    effect,
    inject,
    signal,
    Signal,
} from '@angular/core';
import { MovieInterface } from '../models/movie.interface';
import { toSignal } from '@angular/core/rxjs-interop';
import { environment } from '../../../environments/environment';
import { AveragePipe } from '../utils/average.pipe';
import { MoviesService } from '../data-access/movies.service';
import { map } from 'rxjs';

@Component({
    selector: 'app-movies',
    imports: [AveragePipe],
    templateUrl: './movies.component.html',
})
export class MoviesComponent {
    private readonly moviesService = inject(MoviesService);

    // check if it works in production
    public readonly url = `${environment.serverUrl}/uploads/`;

    public searchGenre = signal('');

    public readonly movies: Signal<MovieInterface[]> = toSignal(
        this.moviesService
            .getAllMovies()
            .pipe(
                map((movies) =>
                    movies.map((movie) => ({
                        ...movie,
                        reviews: movie.reviews.filter(
                            (review) => review.is_Validated,
                        ),
                    })),
                ),
            ),
        { initialValue: [] },
    );

    public selectedMovie!: string | null;
    public reviewIndex: Record<string, number> = {};

    getRandomReview(max: number, movieId: string) {
        const randomIndex = Math.floor(Math.random() * max);
        this.reviewIndex[movieId] = randomIndex;
    }

    movieeffect = effect(() => console.log(this.movies(), 'toto'));

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
