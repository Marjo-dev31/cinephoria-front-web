import {
    Component,
    computed,
    effect,
    inject,
    signal,
    Signal,
} from '@angular/core';
import { MovieUpdateInterface } from '../models/movie.interface';
import { toSignal } from '@angular/core/rxjs-interop';
import { environment } from '../../../environments/environment';
import { AveragePipe } from '../utils/average.pipe';
import { MoviesService } from '../data-access/movies.service';



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

    public readonly movies: Signal<MovieUpdateInterface[]> = toSignal(
        this.moviesService.getAllMovies(),
        { initialValue: [] },
    );

    public reviewIndex: number = 0;

    getRandomReview(max: number): number {
        return this.reviewIndex = Math.floor(Math.random() * max);
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
