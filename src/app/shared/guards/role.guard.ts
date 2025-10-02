import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';
import { UserService } from '../../user/data-access/user.service';

export const roleGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
    const router = inject(Router);
    const userService = inject(UserService);

    const isAuthorized = (route: ActivatedRouteSnapshot) => {
        const role = userService.currentUser.value.role;
        
        const expectedRole = route.data['expectedRoles'];
        console.log(role, expectedRole)
        if (expectedRole.indexOf(role) !== -1) {
            return true;
        }
        router.navigate(['forbidden']);
        return false;
    };
    return isAuthorized(route);
};
