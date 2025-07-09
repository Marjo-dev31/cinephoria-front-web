import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { MovieUpdateInterface } from './movie.interface';

@Injectable({
    providedIn: 'root',
})
export class MoviesService {
    private readonly url = `${environment.serverUrl}/movies`;
    private readonly http = inject(HttpClient);

    getAllMovies(): Observable<MovieUpdateInterface[]> {
        return this.http.get<MovieUpdateInterface[]>(this.url);
    }
}
