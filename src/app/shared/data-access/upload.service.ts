import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

interface UploadResponseInterface {
    message: string;
    filename: string;
    size: number;
}
@Injectable({
    providedIn: 'root',
})
export class UploadService {
    private readonly url = `${environment.serverUrl}/upload`;
    private readonly http = inject(HttpClient);

    addImage(form: FormData): Observable<UploadResponseInterface> {
        return this.http.post<UploadResponseInterface>(`${this.url}`, form);
    }
}
