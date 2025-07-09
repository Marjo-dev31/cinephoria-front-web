import { Component, inject, OnInit, Signal } from '@angular/core';
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

    moviesback: Signal<MovieUpdateInterface[]> = toSignal(
        this.moviesService.getAllMovies(),
        { initialValue: [] },
    );
}
