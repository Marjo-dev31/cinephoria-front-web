import { Component, input, signal } from '@angular/core';
import { DatatableComponent } from '../../shared/ui/datatable/datatable.component';
import { OrderInterface } from '../models/oder.interface';

@Component({
    selector: 'app-order',
    standalone: true,
    imports: [DatatableComponent],
    templateUrl: './order.component.html',
})
export class OrderComponent {
    orders = input.required<OrderInterface[]>()

    displayColumns = signal([
        {
            key: 'date',
            label: 'date de séance',
            accessor: (row: OrderInterface) =>
                new Date(row.showing.date).toLocaleDateString(),
        },
        {
            key: 'cinema',
            label: 'cinema',
            accessor: (row: OrderInterface) => row.showing.room.cinema.city,
        },
        {
            key: 'movie',
            label: 'film',
            accessor: (row: OrderInterface) => row.showing.movie?.title,
        },
        {
            key: 'quantity',
            label: 'quantité',
            accessor: (row: OrderInterface) => row.quantity,
        },
        {
            key: 'total',
            label: 'total',
            accessor: (row: OrderInterface) => row.total,
        },
    ]);
}
