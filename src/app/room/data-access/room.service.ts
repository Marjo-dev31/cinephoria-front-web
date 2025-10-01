import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import {
    CreateRoomInterface,
    RoomInterface,
    UpdateRoomInterface,
} from '../models/room.interface';

@Injectable({
    providedIn: 'root',
})
export class RoomService {
    private readonly url = `${environment.serverUrl}/room`;
    private readonly http = inject(HttpClient);

    getAllRooms(): Observable<RoomInterface[]> {
        return this.http.get<RoomInterface[]>(this.url);
    }

    getRoomById(room: RoomInterface): Observable<RoomInterface> {
        return this.http.get<RoomInterface>(`${this.url}/${room.id}`);
    }

    createRoom(room: CreateRoomInterface): Observable<RoomInterface> {
        return this.http.post<RoomInterface>(this.url, room);
    }

    updateRoom(room: UpdateRoomInterface): Observable<RoomInterface> {
        return this.http.put<RoomInterface>(`${this.url}/${room.id}`, room);
    }

    deleteRoom(id: string): Observable<RoomInterface> {
        return this.http.delete<RoomInterface>(`${this.url}/${id}`);
    }
}
