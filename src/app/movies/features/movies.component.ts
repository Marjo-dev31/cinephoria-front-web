import {
    Component,
    computed,
    DestroyRef,
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
import { ShowingDialogComponent } from '../../shared/ui/showing.dialog.component';
import { upcomingDate } from '../../shared/util/upcomingDate';
import { Router } from '@angular/router';

@Component({
    selector: 'app-movies',
    imports: [AveragePipe, DialogModule],
    templateUrl: './movies.component.html',
})
export class MoviesComponent {
    private readonly moviesService = inject(MoviesService);
    private readonly destroyRef = inject(DestroyRef);
    private readonly dialog = inject(Dialog);
    private readonly router = inject(Router);

    // check if it works in production
    public readonly url = `${environment.serverUrl}/uploads/`;

    public searchGenre = signal('');
    public searchCinema = signal('');
    public searchDate = signal('');
    public today = signal(new Date().toISOString().split('T')[0]);

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
    public reviewIndex: Record<string, number> = {};

    getRandomReview(max: number, movieId: string) {
        const randomIndex = Math.floor(Math.random() * max);
        this.reviewIndex[movieId] = randomIndex;
    }

    moviesFiltered = computed(() =>
        this.movies().filter(
            (movie) =>
                movie.showing.some((showing) =>
                    showing.room.cinema.city
                        .toLowerCase()
                        .includes(this.searchCinema().toLowerCase()),
                ) &&
                movie.genre.title
                    .toLowerCase()
                    .includes(this.searchGenre().toLowerCase()) &&
                movie.showing.some((showing) =>
                    showing.date.toLocaleString().includes(this.searchDate()),
                ),
        ),
    );

    onSearchGenreUpdated(genre: string) {
        this.searchGenre.set(genre);
    }
    onSearchCinemaUpdated(cinema: string) {
        this.searchCinema.set(cinema);
    }
    onSearchDateUpdated(date: string) {
        this.searchDate.set(date);
    }

    // get showing dialog

    getShowingByMovie(id: string) {
        this.moviesService
            .getById(id)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe((data) => {
                const dialogRef = this.dialog.open(ShowingDialogComponent, {
                    height: '400px',
                    width: '600px',
                    data: data.showing.filter(
                        (showing) =>
                            upcomingDate(showing.date) &&
                            showing.seat.some((seat) => !seat.reserved),
                    ),
                });
                dialogRef.closed.subscribe((showingId) =>
                    this.router.navigate(['/reservation'], {
                        state: { data: showingId },
                    }),
                );
            });
    }
}
