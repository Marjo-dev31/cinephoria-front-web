import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { CinemaInterface } from '../models/cinema.interface';
import { SeatInterface } from '../models/seat.interface';


@Injectable({
    providedIn: 'root',
})
export class SeatService {
    private readonly url = `${environment.serverUrl}/seat`;
    private readonly http = inject(HttpClient);

    updateSeat(seat: SeatInterface):Observable<SeatInterface> {
     return this.http.patch<SeatInterface>(`${this.url}/${seat.id}`, seat)
    }

}
