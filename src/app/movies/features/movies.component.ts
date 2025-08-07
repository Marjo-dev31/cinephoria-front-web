import {
    Component,
    computed,
    DestroyRef,
    effect,
    inject,
    signal,
    Signal,
} from '@angular/core';
import { MovieInterface } from '../models/movie.interface';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { environment } from '../../../environments/environment';
import { AveragePipe } from '../utils/average.pipe';
import { MoviesService } from '../data-access/movies.service';
import { map } from 'rxjs';
import { Dialog, DialogModule } from '@angular/cdk/dialog';
import { DialogComponent } from '../../shared/ui/dialog.component';

@Component({
    selector: 'app-movies',
    imports: [AveragePipe, DialogModule],
    templateUrl: './movies.component.html',
})
export class MoviesComponent {
    private readonly moviesService = inject(MoviesService);
    private readonly destroyRef = inject(DestroyRef);
    private readonly dialog = inject(Dialog);

    // check if it works in production
    public readonly url = `${environment.serverUrl}/uploads/`;

    public searchGenre = signal('');
    public searchCinema = signal('');
    public searchDate = signal('')

    public readonly movies: Signal<MovieInterface[]> = toSignal(
        this.moviesService.getAllMovies().pipe(
            map((movies) =>
                movies
                    .map((movie) => ({
                        ...movie,
                        reviews: movie.reviews.filter(
                            (review) => review.is_Validated,
                        ),
                    }))
                    .filter((movie) => movie.showing.length),
            ),
        ),
        { initialValue: [] },
    );

    // get random reviews
    public selectedMovie!: string | null;
    public reviewIndex: Record<string, number> = {};

    getRandomReview(max: number, movieId: string) {
        const randomIndex = Math.floor(Math.random() * max);
        this.reviewIndex[movieId] = randomIndex;
    }

    movieeffect = effect(() =>
        console.log(this.movies(), 'toto', this.moviesFiltered()),
    );

    // make filter for cinema and date when session service created
    moviesFiltered = computed(() =>
        this.movies().filter((movie) =>
            movie.showing
            .some((showing) => showing.room.cinema.city.toLowerCase().includes(this.searchCinema().toLowerCase())) &&
            movie.genre.title.toLowerCase().includes(this.searchGenre().toLowerCase()) &&
            movie.showing.some((showing)=> showing.date.toLocaleString().includes(this.searchDate()))
        ),
    );

    onSearchGenreUpdated(genre: string) {
        this.searchGenre.set(genre);
    }
    onSearchCinemaUpdated(cinema: string) {
        this.searchCinema.set(cinema);
    }
    onSearchDateUpdated(date:string) {
        this.searchDate.set(date)
    }

    // get showing dialog

    getShowingByMovie(id: string) {
        this.moviesService
            .getById(id)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe((data) =>
                this.dialog.open(DialogComponent, {
                    height: '400px',
                    width: '600px',
                    data: data,
                }),
            );
    }
}
