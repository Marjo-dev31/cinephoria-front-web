import { Component, computed, effect, input, output } from '@angular/core';
import { ColumnInterface } from '../../models/colum.inteface';
import { RoomInterface } from '../../../room/models/room.interface';
import { CdkTableModule } from '@angular/cdk/table';
import { JsonPipe } from '@angular/common';

@Component({
    selector: 'app-datatable',
    standalone: true,
    imports: [CdkTableModule],
    templateUrl: './datatable.component.html',
})
export class DatatableComponent {
    displayColumns = input.required<ColumnInterface[]>();
    data = input.required<RoomInterface[]>();
    onDeleteId = output<string>();
    onEditItem = output<RoomInterface>()

    dataSource = computed(() => this.data());
    columnKeys = computed(() => [
        ...this.displayColumns().map((column) => column.key),
        'action',
    ]);

    deleteItem(id: string) {
        this.onDeleteId.emit(id);
    }

    editItem(room:RoomInterface){
        this.onEditItem.emit(room)
    }

}
