import { Component,  effect, input } from '@angular/core';
import { ColumnInterface } from '../../models/colum.inteface';
import { RoomInterface } from '../../../room/models/room.interface';

@Component({
    selector: 'app-datatable',
    standalone: true,
    imports: [],
    templateUrl: './datatable.component.html',
})
export class DatatableComponent {
    displayColumns = input<ColumnInterface[]>();
    data = input<RoomInterface[]>();

    effect = effect(()=>console.log(this.data()))
}
