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
    isShow = signal(false);
    isLogin = signal(false);
    isAdmin = signal(false);
    isEmployee = signal(false);

    showSideMenu() {
        this.isShow.update((value) => !value);
    }
    
    logout() {}
}
