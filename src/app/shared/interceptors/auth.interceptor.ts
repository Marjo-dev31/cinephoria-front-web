import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { UserService } from '../../user/data-access/user.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const access_token = inject(UserService).access_token.value
    const authReq = req.clone({
        setHeaders: { Authorization: `Bearer ${access_token}` },
    });
    return next(authReq);
};
