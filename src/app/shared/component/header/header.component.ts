import { NgStyle } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-header',
    imports: [RouterLink, NgStyle],
    templateUrl: './header.component.html',
    styles: ``,
})
export class HeaderComponent {
    isShowSideMenu = signal(false);

    // recuperer current user and role
    isLogin = signal(true);
    isAdmin = signal(true);
    isEmployee = signal(false);

    showSideMenu() {
        this.isShowSideMenu.update((value) => !value);
    }
    
    logout() {}
}
