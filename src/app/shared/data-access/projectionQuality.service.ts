import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { ProjectionQualityInterface } from '../models/projectionQuality.interface';


@Injectable({
    providedIn: 'root',
})
export class ProjectionQualityService {
    private readonly url = `${environment.serverUrl}/cinema`;
    private readonly http = inject(HttpClient);

    getAllProjectionQuality(): Observable<ProjectionQualityInterface[]> {
        return this.http.get<ProjectionQualityInterface[]>(this.url);
    }

}