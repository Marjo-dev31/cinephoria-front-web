import {
    Component,
    computed,
    inject,
    Signal,
} from '@angular/core';
import { CarouselComponent } from '../shared/ui/carrousel';
import { MovieUpdateInterface } from '../movies/models/movie.interface';
import { toSignal } from '@angular/core/rxjs-interop';
import { MoviesService } from '../movies/data-access/movies.service';

@Component({
    selector: 'app-home',
    imports: [CarouselComponent],
    templateUrl: './home.component.html',
})
export class HomeComponent {
    private readonly moviesService = inject(MoviesService);

    readonly movies: Signal<MovieUpdateInterface[]> = toSignal(
        this.moviesService.getAllMovies(),
        { initialValue: [] },
    );

    readonly lastMovies: Signal<MovieUpdateInterface[]> = computed(() => {
        return this.getMoviesSinceLastWednesday(this.movies());
    });

    getMoviesSinceLastWednesday(
        movies: MovieUpdateInterface[],
    ): MovieUpdateInterface[] | [] {
        const today = new Date();
        const day = today.getDay();
        const daysSinceWednesday = (day + 7 - 3) % 7 || 7;
        const lastWednesday = new Date();
        lastWednesday.setDate(today.getDate() - daysSinceWednesday);
        lastWednesday.setHours(0, 0, 0, 0);

        const recentMovies = movies.filter((movie) => {
            const createAtDate = new Date(movie.create_At);
           return createAtDate >= lastWednesday ? movie : null;
        });
        return recentMovies;
    }
}
