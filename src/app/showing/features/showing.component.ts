import {
    Component,
    computed,
    effect,
    inject,
    OnInit,
    signal,
} from '@angular/core';
import { ShowingService } from '../data-access/showing.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { CinemaService } from '../../shared/data-access/cinema.service';
import { DynamicControl } from '../../shared/models/form.interface';
import {
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { CinemaInterface } from '../../shared/models/cinema.interface';
import { map, switchMap, tap } from 'rxjs';
import { NgStyle } from '@angular/common';
import { Seat } from '../../shared/models/seat.interface';
import { seatAvailableNumber } from '../../shared/util/seatAvailableNumber';
import { accessibleSeatAvailableNumber } from '../../shared/util/accessibleSeatAvailableNumber';

@Component({
    selector: 'app-showing',
    imports: [ReactiveFormsModule, NgStyle],
    templateUrl: './showing.component.html',
})
export class ShowingComponent {
    private readonly showingService = inject(ShowingService);
    private readonly cinemaService = inject(CinemaService);

    private showings = toSignal(this.showingService.getAllShowing());
    
    public cinemas = toSignal(this.cinemaService.getAllCinema());

    public searchCinema = signal('');
    public searchAccessibleSeatNumber = signal(0);
    public wishSeat = signal(0);
    public searchAccessibleSeatNeeded = signal(false);
    public displayAccessibleSeatNumber = signal(false);

    public showingFiltered = computed(() =>
        this.showings()?.filter(
            (showing) =>
                showing.room.cinema.id === this.searchCinema() &&
                seatAvailableNumber(showing.seat) >= this.wishSeat() &&
                accessibleSeatAvailableNumber(showing.seat) >=
                    this.searchAccessibleSeatNumber(),
        ),
    );

    filterForm = new FormGroup({
        cinema: new FormControl('', [Validators.required]),
        movie: new FormControl('', [Validators.required]),
        seat: new FormControl(0, [Validators.required]),
        accessibleSeat: new FormControl(0, [Validators.required]),
    });

    onSearchCinema(cinema: string) {
        this.searchCinema.set(cinema);
    }
     onWishSeat(number: string) {
        this.wishSeat.set(+number);
    }
    
    onSearchAccessibleSeatNeeded(isAccessibleSeatNeeded: string) {
        if (isAccessibleSeatNeeded === 'true') {
            this.displayAccessibleSeatNumber.set(true);
        } else {
            this.displayAccessibleSeatNumber.set(false);
        }
    }

    onSearchAccessibleSeatNumber(accessibleSeat: string) {
        this.searchAccessibleSeatNumber.set(+accessibleSeat);
    }

    effect = effect(() => console.log(this.showingFiltered()));
    // formModelConfig: DynamicControl[] = [
    //     {
    //         controlKey: 'cinema',
    //         formFieldType: 'select',
    //         label: 'Cinéma',
    //         defaultValue: '',
    //         selectOptions: this.cities,
    //         updateOn: 'change',
    //         validators: [Validators.required],
    //     },
    // {
    //     controlKey: 'movie',
    //     formFieldType: 'select',
    //     label: 'Film',
    //     defaultValue: '',
    //     selectOptions: this.showingFiltered()?.map(
    //         (showing) => showing.movie.title,
    //     ),
    //     updateOn: 'change',
    //     validators: [Validators.required],
    // },
    // ];
}
