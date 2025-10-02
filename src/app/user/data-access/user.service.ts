import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import {
    CurrentUserInterface,
    LoginCredantialInterface,
    UserCreateInterface,
    UserInterface,
} from '../models/user.interface';
@Injectable({
    providedIn: 'root',
})
export class UserService {
    private readonly url = `${environment.serverUrl}/user`;
    private readonly http = inject(HttpClient);

    currentUser = new BehaviorSubject<CurrentUserInterface>({
        id: '',
        username: '',
        role: '',
    });

    access_token = new BehaviorSubject<string | undefined >('');

    addAccount(userEmployee: UserCreateInterface): Observable<UserInterface> {
        return this.http.post<UserInterface>(this.url, userEmployee);
    }

    getAllEmployee(): Observable<UserInterface[]> {
        return this.http.get<UserInterface[]>(this.url);
    }

    login(credentials: LoginCredantialInterface): Observable<UserInterface> {
        return this.http
            .post<UserInterface>(`${this.url}/login`, credentials)
            .pipe(
                tap((user) => {
                    this.currentUser.next({
                        id: user.id,
                        username: user.username,
                        role: user.role.name,
                    });
                    this.access_token.next(user.access_token);
                }),
                catchError((err) => {
                    const errorMessage = err?.error?.message;
                    return throwError(() => new Error(errorMessage));
                }),
            );
    }

    updatePassword(updateUser: UserInterface): Observable<UserInterface> {
        return this.http.patch<UserInterface>(
            `${this.url}/${updateUser.id}`,
            updateUser,
        );
    }

    logout() {
        this.currentUser.next({
            id: '',
            username: '',
            role: '',
        });
    }
}
