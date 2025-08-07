import { Component, computed, effect, inject } from '@angular/core';
import { ShowingService } from '../data-access/showing.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { CinemaService } from '../../shared/data-access/cinema.service';

@Component({
    selector: 'app-showing',
    imports: [],
    templateUrl: './showing.component.html',
})
export class ShowingComponent {
    private readonly showingService = inject(ShowingService);
    private readonly cinemaService = inject(CinemaService);

    showings = toSignal(this.showingService.getAllShowing());
    cinemas = toSignal(this.cinemaService.getAllCinema());
    showingFiltered = computed(() =>
        this.showings()?.filter((showing) => showing.room.cinema.id === 'd4e029d7-7dc3-415b-90ab-759457a135fd'),
    );

    effect = effect(() => console.log(this.showings(), this.showingFiltered()));
}
