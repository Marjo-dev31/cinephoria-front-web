import { Component, DestroyRef, inject} from '@angular/core';
import { Validators } from '@angular/forms';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { FormComponent } from '../../../shared/ui/form/form.component';
import { UserService } from '../../data-access/user.service';
import { RoleService } from '../../data-access/role.service';
import { UserCreateInterface } from '../../models/user.interface';
import { RoleInterface } from '../../models/role.interface';
import { DynamicControl } from '../../../shared/models/form.interface';

@Component({
    selector: 'app-signup',
    standalone: true,
    imports: [FormComponent],
    template: `<div class="flex flex-col justify-center items-center m-auto w-2/3">
    <h2 class="text-center text-4xl font-bold font-roboto p-4 capitalize">
        créer un compte
    </h2>
    <app-form
        [formModelConfig]="formModelConfig"
        (outputForm)="handleAddAccount($event)"
        class="w-96"
    >
    </app-form>
</div>`,
})
export class SignUpComponent {
    private readonly userService = inject(UserService);
    private readonly roleService = inject(RoleService);
    private readonly destroyRef = inject(DestroyRef);

    private readonly allRoles = toSignal(this.roleService.getAllRole(), {
        initialValue: [],
    });

    handleAddAccount(user: UserCreateInterface) {
        const roleUser= this.allRoles().find(
            (role: RoleInterface) => role.name === 'user',
        );
        const newUser: UserCreateInterface = {
            firstname: user.firstname,
            lastname: user.lastname,
            mail: user.mail,
            password: user.password,
            username: user.username,
            role: roleUser!,
        };
        this.userService
            .addAccount(newUser)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe();

    }

    readonly formModelConfig: DynamicControl[] = [
        {
            controlKey: 'firstname',
            formFieldType: 'input',
            inputType: 'text',
            label: 'prénom',
            validators: [Validators.required],
        },
        {
            controlKey: 'lastname',
            formFieldType: 'input',
            inputType: 'text',
            label: 'nom',
            validators: [Validators.required],
        },
        {
            controlKey: 'mail',
            formFieldType: 'input',
            inputType: 'email',
            label: 'mail',
            validators: [Validators.required, Validators.email],
        },
        {
            controlKey: 'username',
            formFieldType: 'input',
            inputType: 'text',
            label: 'pseudo',
            validators: [Validators.required],
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
        {
            controlKey: 'confirmPassword',
            formFieldType: 'input',
            inputType: 'password',
            label: 'confirmer password',
            validators: [
                Validators.required,
                Validators.pattern(
                    '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{12,}$',
                ),
            ],
        },
    ];
}
