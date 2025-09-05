import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import {
    CreateShowingInterface,
    ShowingInterface,
    UpdateShowingInterface,
} from '../models/showing.interface';

@Injectable({
    providedIn: 'root',
})
export class ShowingService {
    private readonly url = `${environment.serverUrl}/showing`;
    private readonly http = inject(HttpClient);

    getAllShowing(): Observable<ShowingInterface[]> {
        return this.http.get<ShowingInterface[]>(this.url);
    }

    getShowingById(id: string): Observable<ShowingInterface> {
        return this.http.get<ShowingInterface>(`${this.url}/${id}`);
    }

    addShowing(showing: CreateShowingInterface): Observable<ShowingInterface> {
        return this.http.post<ShowingInterface>(this.url, showing);
    }

    updateShowing(showing: UpdateShowingInterface): Observable<ShowingInterface>{
        return this.http.patch<ShowingInterface>(`${this.url}/${showing.id}`, showing)
    }

    deleteShowing(id: string): Observable<ShowingInterface> {
        return this.http.delete<ShowingInterface>(`${this.url}/${id}`);
    }
}
