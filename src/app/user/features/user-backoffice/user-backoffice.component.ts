import { Component, DestroyRef, inject, signal } from '@angular/core';
import { FormComponent } from '../../../shared/ui/form/form.component';
import { DynamicControl } from '../../../shared/models/form.interface';
import { Validators } from '@angular/forms';
import { UserService } from '../../data-access/user.service';
import { EmployeeCreateInterface } from '../../models/user.interface';
import { RoleService } from '../../data-access/role.service';
import { RoleInterface } from '../../models/role.interface';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';

@Component({
    selector: 'app-user-backoffice',
    standalone: true,
    imports: [FormComponent],
    templateUrl: './user-backoffice.component.html',
})
export class UserBackofficeComponent {
    private readonly userService = inject(UserService);
    private readonly roleService = inject(RoleService);
    private readonly destroyRef = inject(DestroyRef);

    private readonly allRoles = toSignal(this.roleService.getAllRole(), {
        initialValue: [],
    });

    handleAddEmployeeAccount(userEmployee: EmployeeCreateInterface) {
        const roleEmployee = this.allRoles().find(
            (role: RoleInterface) => role.name === 'employee',
        );
        const newEmployee: EmployeeCreateInterface = {
            firstname: userEmployee.firstname,
            lastname: userEmployee.lastname,
            mail: userEmployee.mail,
            password: userEmployee.password,
            role: roleEmployee!,
        };
        this.userService
            .addEmployeeAccount(newEmployee)
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
