import { Component, computed, effect, inject, signal } from '@angular/core';
import { ShowingService } from '../data-access/showing.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { CinemaService } from '../../shared/data-access/cinema.service';
import {
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { CurrencyPipe, DatePipe, NgStyle } from '@angular/common';
import { seatAvailableNumber } from '../../shared/util/seatAvailableNumber';
import { accessibleSeatAvailableNumber } from '../../shared/util/accessibleSeatAvailableNumber';
import { HoursDisplayPipe } from '../../shared/util/pipes/hoursDisplay.pipe';
import { ShowingInterface } from '../models/showing.interface';

@Component({
    selector: 'app-showing',
    imports: [
        ReactiveFormsModule,
        NgStyle,
        DatePipe,
        CurrencyPipe,
        HoursDisplayPipe,
        NgStyle,
    ],
    templateUrl: './showing.component.html',
})
export class ShowingComponent {
    private readonly showingService = inject(ShowingService);
    private readonly cinemaService = inject(CinemaService);

    private showings = toSignal(this.showingService.getAllShowing());

    public cinemas = toSignal(this.cinemaService.getAllCinema());

    public searchCinemaSignal = signal('');
    public searchAccessibleSeatNumber = signal(0);
    public wishSeatSignal = signal(0);
    public searchAccessibleSeatNeeded = signal(false);
    public displayAccessibleSeatNumber = signal(false);
    public totalCartSignal = signal(0);
    public selectedIndex = signal(-1);
    public selectedShowingSignal = signal<ShowingInterface[]>([])


    public showingFilterByCinema = computed(() =>
        this.showings()?.filter(
            (showing) => showing.room.cinema.id === this.searchCinemaSignal(),
        ),
    );

    public showingFiltered = computed(() =>
        this.showings()?.filter(
            (showing) =>
                showing.room.cinema.id === this.searchCinemaSignal() &&
                seatAvailableNumber(showing.seat) >= this.wishSeatSignal() &&
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
        this.searchCinemaSignal.set(cinema);
    }
    onWishSeat(number: string) {
        this.wishSeatSignal.set(+number);
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

    onSelectShowing(price: number, index: number) {
        const total = price * this.wishSeatSignal();
        this.selectedIndex.set(index);
        this.totalCartSignal.set(total);
    }

    onSubmit() {
        const selectedShowing = this.showingFiltered()?.filter(
            (showing, index) => index === this.selectedIndex(),
        ); 
     this.selectedShowingSignal.set(selectedShowing || []);
     console.log(
            `Reservation faite pour la séance : ${selectedShowing?.[0].id}`,
       this.selectedShowingSignal());
    }

    effect = effect(() =>
        console.log(this.showingFiltered(), this.totalCartSignal()),
    );
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
