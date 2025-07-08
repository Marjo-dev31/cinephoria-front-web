import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class MoviesService {
    private readonly url = `${environment.serverUrl}/movies`;
    private readonly http = inject(HttpClient);

    getAllMovies() {
        return this.http.get(this.url);
    }
}
