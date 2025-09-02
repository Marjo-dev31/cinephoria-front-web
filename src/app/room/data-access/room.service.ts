import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { RoomInterface } from '../models/room.interface';

@Injectable({
    providedIn: 'root',
})
export class RoomService {
    private readonly url = `${environment.serverUrl}/room`;
    private readonly http = inject(HttpClient);

    getAllRooms(): Observable<RoomInterface[]> {
        return this.http.get<RoomInterface[]>(this.url);
    }
}
