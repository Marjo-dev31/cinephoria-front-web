import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { CinemaInterface } from '../models/cinema.interface';


@Injectable({
    providedIn: 'root',
})
export class CinemaService {
    private readonly url = `${environment.serverUrl}/cinema`;
    private readonly http = inject(HttpClient);

    getAllCinema(): Observable<CinemaInterface[]> {
        return this.http.get<CinemaInterface[]>(this.url);
    }

}
