import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../../user/data-access/user.service';

export const authGuard: CanActivateFn = () => {
    const router = inject(Router);
    const access_token = inject(UserService).access_token;
    if (access_token.value?.length) {
        return true;
    }
    router.navigate(['/login']);
    return false;
};
