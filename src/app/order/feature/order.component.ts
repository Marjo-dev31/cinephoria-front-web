import { Component, inject, input, output, signal } from '@angular/core';
import { DatatableComponent } from '../../shared/ui/datatable/datatable.component';
import { OrderService } from '../data-access/order.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { OrderInterface } from '../models/oder.interface';

@Component({
    selector: 'app-order',
    standalone: true,
    imports: [DatatableComponent],
    templateUrl: './order.component.html',
})
export class OrderComponent {
    private readonly orderService = inject(OrderService);
    onEditForm = output<string>();
    currentUser = input<string>('ef8357b7-d6f0-48c3-b9b4-2c7f28df18ca');
    orders = toSignal(this.orderService.getOrdersByUser(this.currentUser()), {
        initialValue: [],
    });

    handleEditForm(item: any) {
        this.onEditForm.emit(item);
    }

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
