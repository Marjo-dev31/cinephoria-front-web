import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { OrderCreateInterface, OrderInterface } from '../models/order.interface';

@Injectable({
    providedIn: 'root',
})
export class OrderService {
    private readonly url = `${environment.serverUrl}/order`;
    private readonly http = inject(HttpClient);

    addOrder(order: OrderCreateInterface): Observable<OrderInterface> {
        return this.http.post<OrderInterface>(this.url, order);
    }

    getOrdersByUser(id: string): Observable<OrderInterface[]>{
        return this.http.get<OrderInterface[]>(`${this.url}/${id}`)
    }
}
