import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
    const router = inject(Router);
    return next(req).pipe(
        catchError((err: HttpErrorResponse) => {
            if (err) {
                switch (err.status) {
                    case 500:
                        router.navigateByUrl('/error');
                        break;
                    case 404:
                        if (
                            err.error.message ===
                            'Email ou mot de passe invalide'
                        ) {
                            router.navigateByUrl('/login');
                        } else {
                            router.navigateByUrl('/error');
                        }
                        break;
                    case 401:
                        router.navigateByUrl('/error');
                        break;
                    case 400:
                        router.navigateByUrl('/error');
                        break;
                    case 403:
                        router.navigateByUrl('/forbidden');
                        break;
                }
            }
            throw err;
        }),
    );
};
