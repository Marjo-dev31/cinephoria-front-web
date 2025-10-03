import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { FormComponent } from '../../../shared/ui/form/form.component';
import { DynamicControl } from '../../../shared/models/form.interface';
import { Validators } from '@angular/forms';
import { UserService } from '../../data-access/user.service';
import { LoginCredantialInterface } from '../../models/user.interface';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [FormComponent, RouterLink],
    template: `<div
        class="flex flex-col justify-center items-center m-auto w-2/3"
    >
        <h2 class="text-center text-4xl font-bold font-roboto p-4 capitalize">
            se connecter
        </h2>
        @if (errorMessage()) {
            <p class="text-red-600 text-center">{{ errorMessage() }}</p>
        }
        <app-form
            [formModelConfig]="formModelConfig"
            (outputForm)="handleLogin($event)"
            class="w-96 mt-10"
        >
        </app-form>
        <div class="text-sm flex gap-1">
            <p>Vous n'êtes pas encore inscrit ?</p>
            <a
                [routerLink]="['/signup']"
                routerLinkActive="router-link-active"
                class="italic underline hover:bg-peach hover:cursor-pointer rounded-lg px-2"
                >Cliquez-ici</a
            >
        </div>
    </div>`,
})
export class LoginComponent implements OnInit {
    private readonly userService = inject(UserService);
    private readonly router = inject(Router);
    private readonly destroyRef = inject(DestroyRef);
    private readonly activatedRoute = inject(ActivatedRoute);
    private readonly params = toSignal(this.activatedRoute.queryParams, {
        initialValue: { data: '', seat: 0 },
    });

    readonly errorMessage = signal('');

    handleLogin(loginCredentials: LoginCredantialInterface) {
        this.userService
            .login(loginCredentials)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
                next: (response) => {
                    if (response.role.name === 'user') {
                        if (this.params().seat > 0) {
                            this.router.navigate(['reservation'], {
                                queryParams: {
                                    data: this.params().data,
                                    seat: this.params().seat,
                                },
                            });
                        } else {
                            this.router.navigate(['myspace']);
                        }
                    } else {
                        this.router.navigate(['backoffice']);
                    }
                },
                error: (err) => this.errorMessage.set(err.message),
            });
    }

    ngOnInit(): void {}

    readonly formModelConfig: DynamicControl[] = [
        {
            controlKey: 'mail',
            formFieldType: 'input',
            inputType: 'email',
            label: 'mail',
            validators: [Validators.required, Validators.email],
        },
        {
            controlKey: 'password',
            formFieldType: 'input',
            inputType: 'password',
            label: 'password',
            validators: [
                Validators.required,
                Validators.pattern(
                    '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{12,}$',
                ),
            ],
        },
    ];
}
