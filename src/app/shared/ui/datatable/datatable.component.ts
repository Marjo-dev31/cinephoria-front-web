import { Component, computed, input, output, signal } from '@angular/core';
import { ColumnInterface } from '../../models/colum.inteface';
import { RoomInterface } from '../../../room/models/room.interface';
import { CdkTableModule } from '@angular/cdk/table';
import { MovieInterface, MovieOnMongoInterface } from '../../../movies/models/movie.interface';
import { ShowingInterface } from '../../../showing/models/showing.interface';
import { ReviewInterface } from '../../../reviews/models/review.interface';
import { OrderInterface } from '../../../order/models/oder.interface';

@Component({
    selector: 'app-datatable',
    standalone: true,
    imports: [CdkTableModule],
    templateUrl: './datatable.component.html',
})
export class DatatableComponent {
    displayColumns = input.required<ColumnInterface[]>();
    data =
        input.required<
            (
                | RoomInterface
                | MovieInterface
                | ShowingInterface
                | ReviewInterface
                | OrderInterface
                | MovieOnMongoInterface
            )[]
        >();
    isReviewData = input(false);
    isOrderData = input(false);
    onDeleteId = output<string>();
    onEditItem = output<RoomInterface | MovieInterface>();
    onChangeStatus = output<string>();

    dataSource = computed(() => this.data());
    columnKeys = computed(() => [
        ...this.displayColumns().map((column) => column.key),
        'action',
    ]);

    deleteItem(id: string) {
        this.onDeleteId.emit(id);
    }

    editItem(item: any) {
        this.onEditItem.emit(item);
    }

    changeStatus(id: string) {
        this.onChangeStatus.emit(id);
    }
}
