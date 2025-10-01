import {
    Component,
    computed,
    DestroyRef,
    inject,
    OnInit,
    signal,
} from '@angular/core';
import { DatatableComponent } from '../../../shared/ui/datatable/datatable.component';
import { FormComponent } from '../../../shared/ui/form/form.component';
import { NgStyle } from '@angular/common';
import { ShowingService } from '../../data-access/showing.service';
import {
    CreateShowingInterface,
    DisplayShowingFormInterface,
    ShowingInterface,
    UpdateShowingInterface,
} from '../../models/showing.interface';
import { DynamicControl } from '../../../shared/models/form.interface';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { combineLatest, tap } from 'rxjs';
import { RoomService } from '../../../room/data-access/room.service';
import { MoviesService } from '../../../movies/data-access/movies.service';
import { Validators } from '@angular/forms';

@Component({
    selector: 'app-showing-backoffice',
    standalone: true,
    imports: [DatatableComponent, FormComponent, NgStyle],
    templateUrl: './showing-backoffice.component.html',
})
export class ShowingBackofficeComponent implements OnInit {
    private readonly showingService = inject(ShowingService);
    private readonly roomService = inject(RoomService);
    private readonly movieService = inject(MoviesService);

    private readonly destroyRef = inject(DestroyRef);

    showings: ShowingInterface[] = [];
    isDisplayAddForm = signal(false);
    isDiplayEditForm = signal(false);
    formModelConfig!: DynamicControl[];

    currentShowing = signal<ShowingInterface>({
        id: '',
        date: new Date(),
        startAt: '',
        endAt: '',
        room: {
            id: '',
            number: 0,
            numberOfSeats: 0,
            cinema: { id: '', city: '' },
            projectionQuality: { id: '', quality: '' },
        },
        seat: [],
    });

    currentShowingDisplayOnForm = computed<DisplayShowingFormInterface>(() => {
        return {
            room: `${this.currentShowing().room.number}/${this.currentShowing().room.cinema.city}`,
            movie: this.currentShowing().movie?.title,
            date: new Date(this.currentShowing().date)
                .toISOString()
                .split('T')[0],
            startAt: this.currentShowing().startAt,
            endAt: this.currentShowing().endAt,
        };
    });

    onDisplayForm() {
        this.isDisplayAddForm.update((value) => !value);
    }

    handleCloseForm(close: boolean) {
        this.isDiplayEditForm.set(close);
        this.isDisplayAddForm.set(close);
    }

    getAllShowings() {
        return this.showingService
            .getAllShowing()
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe((showings) => (this.showings = showings));
    }

    handleAddShowing(showing: DisplayShowingFormInterface) {
        combineLatest([
            this.roomService.getAllRooms(),
            this.movieService.getAllMovies(),
        ])
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(([rooms, movies]) => {
                const room = rooms.find(
                    (room) =>
                        room.cinema.city === showing.room.split('/')[1] &&
                        room.number === +showing.room.split('/')[0],
                );
                const movie = movies.find(
                    (movie) => movie.title === showing.movie,
                );
                if (room && movie) {
                    const newShowing: CreateShowingInterface = {
                        date: new Date(showing.date),
                        startAt: showing.startAt,
                        endAt: showing.endAt,
                        movie: movie,
                        room: room,
                    };
                    this.showingService
                        .addShowing(newShowing)
                        .pipe(
                            tap(() => this.getAllShowings()),
                            takeUntilDestroyed(this.destroyRef),
                        )
                        .subscribe();
                }
            });
    }

    handleEditShowing(showing: unknown) {
        this.isDiplayEditForm.set(true);
        this.currentShowing.set(showing as ShowingInterface);
    }

    handleUpdateShowing(showing: DisplayShowingFormInterface) {
        combineLatest([
            this.roomService.getAllRooms(),
            this.movieService.getAllMovies(),
        ])
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(([rooms, movies]) => {
                const room = rooms.find(
                    (room) =>
                        room.cinema.city === showing.room.split('/')[1] &&
                        room.number === +showing.room.split('/')[0],
                );
                const movie = movies.find(
                    (movie) => movie.title === showing.movie,
                );
                if (room && movie) {
                    const updatedShowing: UpdateShowingInterface = {
                        id: this.currentShowing().id,
                        date: new Date(showing.date),
                        startAt: showing.startAt,
                        endAt: showing.endAt,
                        movie: movie,
                        room: room,
                    };
                    this.showingService
                        .updateShowing(updatedShowing)
                        .pipe(
                            tap(() => this.getAllShowings()),
                            takeUntilDestroyed(this.destroyRef),
                        )
                        .subscribe();
                }
            });
    }

    handleDeleteShowing(id: string) {
        this.showingService
            .deleteShowing(id)
            .pipe(
                tap(() => this.getAllShowings()),
                takeUntilDestroyed(this.destroyRef),
            )
            .subscribe();
    }

    ngOnInit(): void {
        this.getAllShowings();
        combineLatest([
            this.roomService.getAllRooms(),
            this.movieService.getAllMovies(),
        ])
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(([rooms, movies]) => {
                const roomOptions = rooms.map(
                    (room) => `${room.number}/${room.cinema.city}`,
                );
                const movieOptions = movies.map((movie) => movie.title);
                this.formModelConfig = [
                    {
                        controlKey: 'room',
                        formFieldType: 'select',
                        label: 'salle/Cinéma',
                        defaultValue: '',
                        selectOptions: roomOptions,
                        validators: [Validators.required],
                    },
                    {
                        controlKey: 'movie',
                        formFieldType: 'select',
                        label: 'film',
                        defaultValue: '',
                        selectOptions: movieOptions,
                        validators: [Validators.required],
                    },
                    {
                        controlKey: 'date',
                        formFieldType: 'input',
                        inputType: 'date',
                        label: 'date',
                        defaultValue: '',
                        min: new Date().toISOString().split('T')[0],
                        validators: [Validators.required],
                    },
                    {
                        controlKey: 'startAt',
                        formFieldType: 'input',
                        inputType: 'time',
                        label: 'heure de début',
                        min: '09:00',
                        max: '21:00',
                        validators: [Validators.required],
                    },
                    {
                        controlKey: 'endAt',
                        formFieldType: 'input',
                        inputType: 'time',
                        label: 'heure de fin',
                        min: '11:00',
                        max: '23:00',
                        validators: [Validators.required],
                    },
                ];
            });
    }

    displayColumns = signal([
        {
            key: 'cinema',
            label: 'cinema',
            accessor: (row: ShowingInterface) => row.room.cinema.city,
        },
        {
            key: 'room',
            label: 'salle',
            accessor: (row: ShowingInterface) => row.room.number,
        },
        {
            key: 'movie',
            label: 'film',
            accessor: (row: ShowingInterface) => row.movie?.title,
        },
        {
            key: 'date',
            label: 'date',
            accessor: (row: ShowingInterface) =>
                new Date(row.date).toLocaleDateString(),
        },
        {
            key: 'startAt',
            label: 'heure de début',
            accessor: (row: ShowingInterface) => row.startAt,
        },
        {
            key: 'endAt',
            label: 'heure de fin',
            accessor: (row: ShowingInterface) => row.endAt,
        },
    ]);
}
