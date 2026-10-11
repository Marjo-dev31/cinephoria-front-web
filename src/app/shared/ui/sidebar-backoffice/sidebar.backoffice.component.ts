import { Component, input, signal } from '@angular/core';
import { SidebarItemInterface } from '../../models/sidebar.interface';
import { RouterLink } from '@angular/router';
import { NgStyle } from '@angular/common';

@Component({
    selector: 'app-sidebar-backoffice',
    imports: [RouterLink, NgStyle],
    templateUrl: `./sidebar.backoffice.component.html`,
})
export class SidebarBackofficeComponent {
    sidebarItems = input.required<SidebarItemInterface[]>();
    currentUserName = input<string>('');

    isShowSidebar = signal(true);
    showSidebar() {
        this.isShowSidebar.update((value) => !value);
        const btnElement = document.getElementById('btn');
        if (!this.isShowSidebar()) {
            btnElement?.classList.remove('-rigth-10');
            btnElement?.classList.add('left-0');
        }
        if (this.isShowSidebar()) {
            btnElement?.classList.remove('left-0');
            btnElement?.classList.add('-rigth-10')
        }
    }
}
