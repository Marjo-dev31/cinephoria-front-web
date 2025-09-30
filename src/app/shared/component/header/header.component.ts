import { NgStyle } from '@angular/common';
import { Component, computed, effect, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../../user/data-access/user.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
    selector: 'app-header',
    imports: [RouterLink, NgStyle],
    templateUrl: './header.component.html',
    styles: ``,
})
export class HeaderComponent {
    private readonly userService = inject(UserService);
    private readonly router = inject(Router);
    readonly currentUser = toSignal(this.userService.currentUser);

    isShowSideMenu = signal(false);

    isLogin = computed(() => !!this.currentUser()?.id);

    effect = effect(() => console.log(this.currentUser(), this.isLogin()));

    showSideMenu() {
        this.isShowSideMenu.update((value) => !value);
    }

    logout() {
        this.userService.logout();
        this.router.navigate(['/login']);
    }
}
