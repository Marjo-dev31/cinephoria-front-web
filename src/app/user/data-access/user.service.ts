import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { UserCreateInterface, UserInterface } from '../models/user.interface';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    private readonly url = `${environment.serverUrl}/user`;
    private readonly http = inject(HttpClient);

    addEmployeeAccount(userEmployee:UserCreateInterface): Observable<UserInterface> {
      return this.http.post<UserInterface>(this.url, userEmployee)
    }
}