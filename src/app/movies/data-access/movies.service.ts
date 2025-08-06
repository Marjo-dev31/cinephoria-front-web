import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { MovieInterface} from '../models/movie.interface';


@Injectable({
    providedIn: 'root',
})
export class MoviesService {
    private readonly url = `${environment.serverUrl}/movies`;
    private readonly http = inject(HttpClient);

    getAllMovies(): Observable<MovieInterface[]> {
        return this.http.get<MovieInterface[]>(this.url);
    }

    getById(id: string): Observable<MovieInterface> {
        return this.http.get<MovieInterface>(`${this.url}/${id}`)
    }
}
