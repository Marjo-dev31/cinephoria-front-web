import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { DatatableComponent } from '../../../shared/ui/datatable/datatable.component';
import { RoomService } from '../../data-access/room.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { CreateRoomInterface, RoomDiplayFormInterface, RoomInterface, UpdateRoomInterface } from '../../models/room.interface';
import { FormComponent } from '../../../shared/ui/form/form.component';
import { DynamicControl } from '../../../shared/models/form.interface';
import { Validators } from '@angular/forms';
import { CinemaService } from '../../../shared/data-access/cinema.service';
import { ProjectionQualityService } from '../../../shared/data-access/projectionQuality.service';
import { combineLatest } from 'rxjs';
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
        ProjectionQualityService
    );

    rooms = toSignal(this.roomService.getAllRooms(), { initialValue: [] });
    isDisplayAddForm = signal(false);
    isDiplayEditForm = signal(false);
    currentRoom = signal<RoomInterface>({
        id: '',
        number: 0,
        numberOfSeats: 0,
        cinema:{id:'',city:''},
        projectionQuality:{id:'', quality:''}
    });
    
    currentRoomDisplayOnForm = computed<RoomDiplayFormInterface>(()=>{return {
        number: this.currentRoom().number,
        numberOfSeats: this.currentRoom().numberOfSeats,
        cinema: this.currentRoom().cinema.city,
        projectionQuality: this.currentRoom().projectionQuality.quality,
    }})

    formModelConfig!: DynamicControl[];

    onDisplayForm() {
        this.isDisplayAddForm.update((value) => !value);
    }

    handleDeleteRoom(id: string) {
        this.roomService.deleteRoom(id).subscribe();
    }

    handleEditRoom(room: RoomInterface) {
        this.isDiplayEditForm.set(true);
        this.currentRoom.set(room);

    }

    handleAddRoom(room: RoomDiplayFormInterface) {
        combineLatest([
            this.cinemaService.getAllCinema(),
            this.projectionQualityService.getAllProjectionQuality(),
        ]).subscribe(([cinemas, qualities]) => {
            const cinema = cinemas.find(
                (cinema) => cinema.city === room.cinema,
            );
            const quality = qualities.find(
                (quality) => quality.quality === room.projectionQuality,
            );
            if (cinema && quality) {
                const newRoom:CreateRoomInterface = {
                    number: room.number,
                    numberOfSeats: room.numberOfSeats,
                    cinema: cinema,
                    projectionQuality: quality,
                };
                this.roomService.createRoom(newRoom).subscribe();
            }
        });
    }

    handleUpdateRoom(room: RoomDiplayFormInterface){
        combineLatest([
            this.cinemaService.getAllCinema(),
            this.projectionQualityService.getAllProjectionQuality(),
        ]).subscribe(([cinemas, qualities]) => {
            const cinema = cinemas.find(
                (cinema) => cinema.city === room.cinema,
            );
            const quality = qualities.find(
                (quality) => quality.quality === room.projectionQuality,
            );
            console.log(room,cinema, quality,'handleupdate')
            if (cinema && quality) {
                const updatedRoom:UpdateRoomInterface = {
                    id:this.currentRoom().id,
                    number: room.number,
                    numberOfSeats: room.numberOfSeats,
                    cinema: cinema,
                    projectionQuality: quality,
                };
                this.roomService.updateRoom(updatedRoom).subscribe();
            }
        });

    }

    ngOnInit(): void {
        combineLatest([
            this.cinemaService.getAllCinema(),
            this.projectionQualityService.getAllProjectionQuality(),
        ]).subscribe(([cinemas, qualities]) => {
            const cinemaOptions = cinemas.map((cinema) =>cinema.city);
            const projectionQualitiesOptions = qualities.map(
                (quality) => quality.quality
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
