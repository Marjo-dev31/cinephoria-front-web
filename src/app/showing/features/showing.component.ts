import {
    AfterViewInit,
    Component,
    computed,
    DestroyRef,
    inject,
    OnInit,
    signal,
} from '@angular/core';
import { ShowingService } from '../data-access/showing.service';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
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
import { DynamicControl } from '../../shared/models/form.interface';
import { Dialog } from '@angular/cdk/dialog';
import { PaymentDialogComponent } from '../../shared/ui/payment.dialog.component';
import { SeatService } from '../../shared/data-access/seat.service';
import { OrderService } from '../../order/data-access/order.service';
import { upcomingDate } from '../../shared/util/upcomingDate';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';

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
export class ShowingComponent implements OnInit {
    private readonly showingService = inject(ShowingService);
    private readonly cinemaService = inject(CinemaService);
    private readonly dialog = inject(Dialog);
    private readonly seatService = inject(SeatService);
    private readonly orderService = inject(OrderService);
    private readonly activatedRoute = inject(ActivatedRoute);
    private readonly destroyRef = inject(DestroyRef);

    private showings = toSignal(this.showingService.getAllShowing());
    public cinemas = toSignal(this.cinemaService.getAllCinema());

    public searchCinemaSignal = signal('');
    public searchAccessibleSeatNumber = signal(0);
    public wishSeatSignal = signal(1);
    public totalCartSignal = signal(0);
    public selectedIndex = signal(-1);
    public selectedShowingSignal = signal<ShowingInterface[]>([]);
    public selectSeatIndex = signal<number[]>([]);

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
                    this.searchAccessibleSeatNumber() &&
                upcomingDate(showing.date),
        ),
    );

    filterForm = new FormGroup({
        cinema: new FormControl('', [Validators.required]),
        movie: new FormControl('', [Validators.required]),
        seat: new FormControl(1, [Validators.required]),
        accessibleSeat: new FormControl(0, [Validators.required]),
    });

    ngOnInit() {
        this.getShowingByRedirection();
    }

    onSearchCinema(cinema: string) {
        this.searchCinemaSignal.set(cinema);
    }

    onWishSeat(number: string) {
        this.wishSeatSignal.set(+number);
        this.resetSelection();
    }

    onSearchAccessibleSeatNumber(accessibleSeat: string) {
        this.searchAccessibleSeatNumber.set(+accessibleSeat);
        this.resetSelection();
    }

    onSelectShowing(price: number, index: number) {
        this.selectedIndex.set(index);
        const selectedShowing = this.showingFiltered()?.filter(
            (showing, index) => index === this.selectedIndex(),
        );
        selectedShowing ? this.selectedShowingSignal.set(selectedShowing) : [];
        const total = price * this.wishSeatSignal();
        this.totalCartSignal.set(total);
    }

    onSelectSeat(index: number) {
        this.selectSeatIndex.update((indexArray) => {
            if (indexArray.includes(index)) {
                return indexArray.filter((i) => i !== index);
            }
            if (this.selectSeatIndex().length < this.wishSeatSignal()) {
                return [...indexArray, index];
            }
            return this.selectSeatIndex();
        });
    }

    onSubmit() {
        const dialogRef = this.dialog.open(PaymentDialogComponent, {
            height: '400px',
            width: '400px',
            data: this.formModelConfig,
        });

        dialogRef.closed.subscribe((resaIsValidate) => {
            if (resaIsValidate) {
                const seatArray = this.selectSeatIndex().map(
                    (index) => this.selectedShowingSignal()[0].seat[index],
                );
                // create order
                const newOrder = {
                    quantity: this.wishSeatSignal(),
                    total: this.totalCartSignal(),
                    showing: this.selectedShowingSignal()[0].id,
                    seat: seatArray,
                };
                this.orderService.addOrder(newOrder).subscribe((order) =>
                    seatArray.forEach((seat) => {
                        ((seat.reserved = true),
                            (seat.order = order),
                            this.seatService.updateSeat(seat).subscribe());
                    }),
                );
                this.resetSelection();
                this.searchCinemaSignal.set('');
            }
        });
    }

    resetSelection() {
        this.selectedIndex.set(-1);
        this.totalCartSignal.set(0);
        this.selectedShowingSignal.set([]);
        this.selectSeatIndex.set([]);
    }

    getShowingByRedirection() {
        this.activatedRoute.queryParams
            .pipe(
                switchMap((params) => {
                    const showingId = params['data'];
                    return this.showingService.getShowingById(showingId);
                }),
                takeUntilDestroyed(this.destroyRef),
            )
            .subscribe((showing) => {
                this.searchCinemaSignal.set(showing.room.cinema.id);
                this.filterForm.patchValue({
                    cinema: showing.room.cinema.id,
                    movie: showing.movie?.id,
                });
                const price =
                    this.showingFiltered()?.find(
                        (showingFilter) => showingFilter.id === showing.id,
                    )?.room.projectionQuality.price?.price ?? 0;
                this.onSelectShowing(price, 0);
            });
    }

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

    formModelConfig: DynamicControl[] = [
        {
            controlKey: 'firstname',
            formFieldType: 'input',
            inputType: 'text',
            label: 'Prénom',
            defaultValue: '',
            validators: [Validators.required],
        },
        {
            controlKey: 'lastname',
            formFieldType: 'input',
            inputType: 'text',
            label: 'Nom',
            defaultValue: '',
            validators: [Validators.required],
        },
        {
            controlKey: 'cardNumber',
            formFieldType: 'input',
            inputType: 'text',
            label: 'Numéro de carte bancaire',
            defaultValue: '',
            maxlength: 16,
            validators: [
                Validators.required,
                Validators.minLength(16),
                Validators.maxLength(16),
                Validators.pattern(/^[0-9]\d*$/),
            ],
        },
        {
            controlKey: 'expiryDate',
            formFieldType: 'input',
            inputType: 'month',
            min: new Date().toISOString().slice(0, 7),
            label: "Date d'expiration",
            defaultValue: '',
            validators: [Validators.required],
        },
        {
            controlKey: 'code',
            formFieldType: 'input',
            inputType: 'text',
            label: 'Code de vérification',
            defaultValue: '',
            maxlength: 3,
            validators: [
                Validators.required,
                Validators.minLength(3),
                Validators.maxLength(3),
                Validators.pattern(/^[0-9]\d*$/),
            ],
        },
    ];
}
