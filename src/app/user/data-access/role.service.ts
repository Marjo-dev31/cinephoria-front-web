import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { RoleInterface } from '../models/role.interface';

@Injectable({
    providedIn: 'root',
})
export class RoleService {
    private readonly url = `${environment.serverUrl}/role`;
    private readonly http = inject(HttpClient);

    getAllRole(): Observable<RoleInterface[]> {
        return this.http.get<RoleInterface[]>(this.url);
    }
}
