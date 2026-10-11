import { Component, computed, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarBackofficeComponent } from '../../../../shared/ui/sidebar-backoffice/sidebar.backoffice.component';
import { UserService } from '../../../data-access/user.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
    selector: 'app-backoffice',
    standalone: true,
    imports: [SidebarBackofficeComponent, RouterOutlet],
    template: `<app-sidebar-backoffice
            [sidebarItems]="sidebarItems()"
            [currentUserName]="currentUser().username"
        />
        <router-outlet />`,
})
export class BackofficeComponent {
    private readonly userService = inject(UserService);
    readonly currentUser = toSignal(this.userService.currentUser, {
        initialValue: {
            id: '',
            username: '',
            role: '',
        },
    });

    sidebarItemsCommon = signal([
        { label: 'salle', route: '/room' },
        { label: 'séance', route: '/showing' },
        { label: 'film', route: '/movie' },
    ]);

    sidebarItemsAdmin = signal([
        { label: 'dashboard', route: '/dashboard' },
        { label: 'compte employé', route: '/employeeaccount' },
    ]);

    sidebarItemsEmployee = signal([
        { label: 'modération des avis', route: '/review' },
    ]);

    sidebarItems = computed(() => {
        return this.currentUser().role === 'admin'
            ? [...this.sidebarItemsCommon(), ...this.sidebarItemsAdmin()]
            : [...this.sidebarItemsCommon(), ...this.sidebarItemsEmployee()];
    });
}
