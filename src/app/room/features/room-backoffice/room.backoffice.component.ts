import { Component, effect, inject, signal } from '@angular/core';
import { DatatableComponent } from '../../../shared/ui/datatable/datatable.component';
import { RoomService } from '../../data-access/room.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-roombackoffice',
  standalone: true,
  imports: [DatatableComponent],
  templateUrl: './room.backoffice.component.html',
})
export class RoomBackofficeComponent {
  private readonly roomService = inject(RoomService)

  rooms = toSignal(this.roomService.getAllRooms())

  displayColumns = signal([
        { name: 'cinema', key: 'cinema' },
        { name: 'numéro', key: 'cinema' },
        { name: 'nombre de place', key: 'cinema' },
        { name: 'qualité de projection', key: 'cinema' },
    ]);

}
