import { Component, computed, input, output } from '@angular/core';
import { ColumnInterface } from '../../models/colum.inteface';
import { RoomInterface } from '../../../room/models/room.interface';
import { CdkTableModule } from '@angular/cdk/table';
import { MovieInterface } from '../../../movies/models/movie.interface';
import { ShowingInterface } from '../../../showing/models/showing.interface';

@Component({
    selector: 'app-datatable',
    standalone: true,
    imports: [CdkTableModule],
    templateUrl: './datatable.component.html',
})
export class DatatableComponent {
    displayColumns = input.required<ColumnInterface[]>();
    data = input.required<(RoomInterface | MovieInterface | ShowingInterface)[]>();
    onDeleteId = output<string>();
    onEditItem = output<RoomInterface | MovieInterface>()

    dataSource = computed(() => this.data());
    columnKeys = computed(() => [
        ...this.displayColumns().map((column) => column.key),
        'action',
    ]);

    deleteItem(id: string) {
        this.onDeleteId.emit(id);
    }

    editItem(item: any){
        this.onEditItem.emit(item)
    }

}
