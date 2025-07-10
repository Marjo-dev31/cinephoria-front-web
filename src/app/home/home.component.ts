import {
    Component,
    computed,
    inject,
    Signal,
} from '@angular/core';
import { CarouselComponent } from '../shared/ui/carrousel';
import { MoviesService } from '../movies/movies.service';
import { MovieUpdateInterface } from '../movies/movie.interface';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
    selector: 'app-home',
    imports: [CarouselComponent],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
})
export class HomeComponent {
    private readonly moviesService = inject(MoviesService);

    movies: Signal<MovieUpdateInterface[]> = toSignal(
        this.moviesService.getAllMovies(),
        { initialValue: [] },
    );

    lastMovies: Signal<MovieUpdateInterface[]> = computed(() => {
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
