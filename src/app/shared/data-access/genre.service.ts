import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { GenreInterface } from '../models/genre.interface';

@Injectable({
    providedIn: 'root',
})
export class GenreService {
    private readonly url = `${environment.serverUrl}/genre`;
    private readonly http = inject(HttpClient);

    getAllGenre(): Observable<GenreInterface[]> {
        return this.http.get<GenreInterface[]>(this.url);
    }

}