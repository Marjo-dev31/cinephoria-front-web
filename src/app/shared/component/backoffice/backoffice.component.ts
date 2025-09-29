import { Component, computed, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarBackofficeComponent } from '../../ui/sidebar-backoffice/sidebar.backoffice.component';

@Component({
    selector: 'app-backoffice',
    standalone: true,
    imports: [SidebarBackofficeComponent, RouterOutlet],
    template: `<app-sidebar-backoffice [sidebarItems]="sidebarItems()" [currentUserName]="currentUserName()" />
        <router-outlet />`,
})
export class BackofficeComponent {
    sidebarItemsCommon = signal([
        { label: 'salle', route: '/room' },
        { label: 'séance', route: '/showing' },
        { label: 'film', route: '/movie' },
    ]);

    sidebarItemsAdmin = signal([
        { label: 'dashboard', route: '/dashboard' },
        { label: 'compte employé', route: '/creationaccount' },
    ]);

    sidebarItemsEmployee = signal([
        { label: 'modération des avis', route: '/review' },
    ]);

    currentUserName= signal('Toto')

    // recuperer current user and role
    isLogin = signal(true);
    isAdmin = signal(false);
    isEmployee = signal(true);

    sidebarItems = computed(() => {
  return this.isAdmin()
    ? [...this.sidebarItemsCommon(), ...this.sidebarItemsAdmin()]
    : [...this.sidebarItemsCommon(), ...this.sidebarItemsEmployee()];
});
}
