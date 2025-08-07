import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { ShowingInterface } from '../models/showing.interface';


@Injectable({
    providedIn: 'root',
})
export class ShowingService {
    private readonly url = `${environment.serverUrl}/showing`;
    private readonly http = inject(HttpClient);

    getAllShowing(): Observable<ShowingInterface[]> {
        return this.http.get<ShowingInterface[]>(this.url);
    }

}
