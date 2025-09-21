import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { EmployeeCreateInterface, EmployeeInterface } from '../models/user.interface';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    private readonly url = `${environment.serverUrl}/user`;
    private readonly http = inject(HttpClient);

    addEmployeeAccount(userEmployee:EmployeeCreateInterface): Observable<EmployeeInterface> {
      return this.http.post<EmployeeInterface>(this.url, userEmployee)
    }
}