import {
    Component,
    computed,
    DestroyRef,
    inject,
    OnInit,
    signal,
} from '@angular/core';
import { DatatableComponent } from '../../../shared/ui/datatable/datatable.component';
import { RoomService } from '../../data-access/room.service';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import {
    CreateRoomInterface,
    RoomDiplayFormInterface,
    RoomInterface,
    UpdateRoomInterface,
} from '../../models/room.interface';
import { FormComponent } from '../../../shared/ui/form/form.component';
import { DynamicControl } from '../../../shared/models/form.interface';
import { Validators } from '@angular/forms';
import { CinemaService } from '../../../shared/data-access/cinema.service';
import { ProjectionQualityService } from '../../../shared/data-access/projectionQuality.service';
import { combineLatest, forkJoin, switchMap, tap } from 'rxjs';
import { NgStyle } from '@angular/common';

@Component({
    selector: 'app-roombackoffice',
    standalone: true,
    imports: [DatatableComponent, FormComponent, NgStyle],
    templateUrl: './room.backoffice.component.html',
})
export class RoomBackofficeComponent implements OnInit {
    private readonly roomService = inject(RoomService);
    private readonly cinemaService = inject(CinemaService);
    private readonly projectionQualityService = inject(
        ProjectionQualityService,
    );
    private readonly destroyRef = inject(DestroyRef);

    rooms: RoomInterface[] = [];
    isDisplayAddForm = signal(false);
    isDiplayEditForm = signal(false);
    currentRoom = signal<RoomInterface>({
        id: '',
        number: 0,
        numberOfSeats: 0,
        cinema: { id: '', city: '' },
        projectionQuality: { id: '', quality: '' },
    });

    currentRoomDisplayOnForm = computed<RoomDiplayFormInterface>(() => {
        return {
            number: this.currentRoom().number,
            numberOfSeats: this.currentRoom().numberOfSeats,
            cinema: this.currentRoom().cinema.city,
            projectionQuality: this.currentRoom().projectionQuality.quality,
        };
    });

    formModelConfig!: DynamicControl[];

    onDisplayForm() {
        this.isDisplayAddForm.update((value) => !value);
    }

    handleDeleteRoom(id: string) {
        this.roomService
            .deleteRoom(id)
            .pipe(
                tap(() => this.getAllRooms()),
                takeUntilDestroyed(this.destroyRef),
            )
            .subscribe();
    }

    handleEditRoom(room: any) {
        this.isDiplayEditForm.set(true);
        this.currentRoom.set(room);
    }

    handleAddRoom(room: RoomDiplayFormInterface) {
        combineLatest([
            this.cinemaService.getAllCinema(),
            this.projectionQualityService.getAllProjectionQuality(),
        ])
            .pipe(
                tap(() => this.getAllRooms()),
                takeUntilDestroyed(this.destroyRef),
            )
            .subscribe(([cinemas, qualities]) => {
                const cinema = cinemas.find(
                    (cinema) => cinema.city === room.cinema,
                );
                const quality = qualities.find(
                    (quality) => quality.quality === room.projectionQuality,
                );
                if (cinema && quality) {
                    const newRoom: CreateRoomInterface = {
                        number: room.number,
                        numberOfSeats: room.numberOfSeats,
                        cinema: cinema,
                        projectionQuality: quality,
                    };
                    this.roomService
                        .createRoom(newRoom)
                        .pipe(
                            tap(() => this.getAllRooms()),
                            takeUntilDestroyed(this.destroyRef),
                        )
                        .subscribe();
                }
            });
    }

    handleUpdateRoom(room: RoomDiplayFormInterface) {
        combineLatest([
            this.cinemaService.getAllCinema(),
            this.projectionQualityService.getAllProjectionQuality(),
        ])
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(([cinemas, qualities]) => {
                const cinema = cinemas.find(
                    (cinema) => cinema.city === room.cinema,
                );
                const quality = qualities.find(
                    (quality) => quality.quality === room.projectionQuality,
                );
                if (cinema && quality) {
                    const updatedRoom: UpdateRoomInterface = {
                        id: this.currentRoom().id,
                        number: room.number,
                        numberOfSeats: room.numberOfSeats,
                        cinema: cinema,
                        projectionQuality: quality,
                    };
                    this.roomService
                        .updateRoom(updatedRoom)
                        .pipe(
                            tap(() => this.getAllRooms()),
                            takeUntilDestroyed(this.destroyRef),
                        )
                        .subscribe();
                }
            });
    }

    getAllRooms() {
        return this.roomService
            .getAllRooms()
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe((rooms) => (this.rooms = rooms));
    }

    ngOnInit(): void {
        this.getAllRooms();
        combineLatest([
            this.cinemaService.getAllCinema(),
            this.projectionQualityService.getAllProjectionQuality(),
        ])
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(([cinemas, qualities]) => {
                const cinemaOptions = cinemas.map((cinema) => cinema.city);
                const projectionQualitiesOptions = qualities.map(
                    (quality) => quality.quality,
                );
                this.formModelConfig = [
                    {
                        controlKey: 'cinema',
                        formFieldType: 'select',
                        label: 'cinéma',
                        defaultValue: '',
                        selectOptions: cinemaOptions,
                        validators: [Validators.required],
                    },
                    {
                        controlKey: 'number',
                        formFieldType: 'input',
                        inputType: 'number',
                        label: 'numéro de salle',
                        min: 1,
                        validators: [
                            Validators.required,
                            Validators.pattern(/^[0-9]\d*$/),
                        ],
                    },
                    {
                        controlKey: 'numberOfSeats',
                        formFieldType: 'input',
                        inputType: 'number',
                        label: 'nombre de place',
                        min: 1,
                        validators: [
                            Validators.required,
                            Validators.pattern(/^[0-9]\d*$/),
                        ],
                    },
                    {
                        controlKey: 'projectionQuality',
                        formFieldType: 'select',
                        label: 'qualité de projection',
                        defaultValue: '',
                        selectOptions: projectionQualitiesOptions,
                        validators: [Validators.required],
                    },
                ];
            });
    }

    displayColumns = signal([
        {
            key: 'cinema',
            label: 'cinéma',
            accessor: (row: RoomInterface) => row.cinema?.city,
        },
        {
            key: 'number',
            label: 'numéro de salle',
            accessor: (row: RoomInterface) => row.number,
        },
        {
            key: 'numberOfSeats',
            label: 'nombre de places',
            accessor: (row: RoomInterface) => row.numberOfSeats,
        },
        {
            key: 'projectionQuality',
            label: 'qualité de projection',
            accessor: (row: RoomInterface) => row.projectionQuality.quality,
        },
    ]);
}
