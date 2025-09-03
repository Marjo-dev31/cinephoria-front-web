import { Component, inject, OnInit, signal } from '@angular/core';
import { DatatableComponent } from '../../../shared/ui/datatable/datatable.component';
import { RoomService } from '../../data-access/room.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { RoomInterface } from '../../models/room.interface';
import { FormComponent } from '../../../shared/ui/form/form.component';
import { DynamicControl } from '../../../shared/models/form.interface';
import { Validators } from '@angular/forms';
import { CinemaService } from '../../../shared/data-access/cinema.service';
import { ProjectionQualityService } from '../../../shared/data-access/projectionQuality.service';
import { combineLatest, forkJoin, map, tap } from 'rxjs';

@Component({
    selector: 'app-roombackoffice',
    standalone: true,
    imports: [DatatableComponent, FormComponent],
    templateUrl: './room.backoffice.component.html',
})
export class RoomBackofficeComponent implements OnInit {
    private readonly roomService = inject(RoomService);
    private readonly cinemaService = inject(CinemaService);
    private readonly projectionQualityService = inject(
        ProjectionQualityService,
    );

    rooms = toSignal(this.roomService.getAllRooms(), { initialValue: [] });
    IsDisplayForm = signal(false);

    formModelConfig!: DynamicControl[];

    onDisplayForm() {
        this.IsDisplayForm.update((value) => !value);
    }

    handleDeleteRoom(id: string) {
        console.log(id);
    }

    handleUpdateRoom(room: RoomInterface) {
        console.log(room, 'room');
    }

    handleAddOrUpdateRoom(room: RoomInterface) {
        console.log(room);
    }

    ngOnInit(): void {
        combineLatest([
            this.cinemaService.getAllCinema(),
            this.projectionQualityService.getAllProjectionQuality(),
        ]).subscribe(([cinemas, qualities]) => {
            console.log(cinemas, qualities, 'qualitites');
            const cinemaCities = cinemas.map((cinema) => cinema.city);
            const projectionQualities = qualities.map(
                (quality) => quality.quality,
            );
            this.formModelConfig = [
                {
                    controlKey: 'cinema',
                    formFieldType: 'select',
                    label: 'cinéma',
                    defaultValue: '',
                    selectOptions: cinemaCities,
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
                    selectOptions: projectionQualities,
                    validators: [Validators.required],
                },
            ];
        });
    }

    displayColumns = signal([
        {
            key: 'cinema',
            label: 'cinéma',
            accessor: (row: any) => row.cinema?.city,
        },
        {
            key: 'number',
            label: 'numéro de salle',
            accessor: (row: any) => row.number,
        },
        {
            key: 'numberOfSeats',
            label: 'nombre de places',
            accessor: (row: any) => row.numberOfSeats,
        },
        {
            key: 'projectionQuality',
            label: 'qualité de projection',
            accessor: (row: any) => row.projectionQuality.quality,
        },
    ]);
}
