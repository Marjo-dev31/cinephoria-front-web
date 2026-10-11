import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import {
    MovieCreateInterface,
    MovieInterface,
    MovieOnMongoInterface,
    MovieUpdateInterface,
} from '../models/movie.interface';

@Injectable({
    providedIn: 'root',
})
export class MoviesService {
    private readonly url = `${environment.serverUrl}/movies`;
    private readonly http = inject(HttpClient);

    getAllMovies(): Observable<MovieInterface[]> {
        return this.http.get<MovieInterface[]>(this.url);
    }

    getAllSales(): Observable<MovieOnMongoInterface[]> {
        return this.http.get<MovieOnMongoInterface[]>(`${this.url}/sales`);
    }

    getById(id: string): Observable<MovieInterface> {
        return this.http.get<MovieInterface>(`${this.url}/${id}`);
    }

    createMovie(movie: MovieCreateInterface): Observable<MovieInterface> {
        return this.http.post<MovieInterface>(this.url, movie);
    }

    updateMovie(movie: MovieUpdateInterface): Observable<MovieInterface> {
        return this.http.patch<MovieInterface>(
            `${this.url}/${movie.id}`,
            movie,
        );
    }

    deleteMovie(id: string): Observable<MovieInterface> {
        return this.http.delete<MovieInterface>(`${this.url}/${id}`);
    }
}
