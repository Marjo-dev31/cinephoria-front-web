import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { FormComponent } from '../../../../shared/ui/form/form.component';
import { DynamicControl } from '../../../../shared/models/form.interface';
import { Validators } from '@angular/forms';
import { UserService } from '../../../data-access/user.service';
import {
    UserCreateInterface,
    UserUpdateInterface,
} from '../../../models/user.interface';
import { RoleService } from '../../../data-access/role.service';
import { RoleInterface } from '../../../models/role.interface';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';

@Component({
    selector: 'app-create-employee-form',
    standalone: true,
    imports: [FormComponent],
    templateUrl: './create-employee.component.html',
})
export class CreateEmployeeComponent implements OnInit {
    private readonly userService = inject(UserService);
    private readonly roleService = inject(RoleService);
    private readonly destroyRef = inject(DestroyRef);

    private readonly allRoles = toSignal(this.roleService.getAllRole(), {
        initialValue: [],
    });

    employees!: UserUpdateInterface[];

    formModelUpdatePassword: DynamicControl[] = [];

    handleAddEmployeeAccount(userEmployee: UserCreateInterface) {
        const roleEmployee = this.allRoles().find(
            (role: RoleInterface) => role.name === 'employee',
        );
        const newEmployee: UserCreateInterface = {
            firstname: userEmployee.firstname,
            lastname: userEmployee.lastname,
            mail: userEmployee.mail,
            password: userEmployee.password,
            username: userEmployee.firstname + userEmployee.lastname.charAt(0),
            role: roleEmployee!,
        };
        this.userService
            .addAccount(newEmployee)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe();
    }

    handleUpdatePassword(userUpdate: any) {
        const employeeToUpdate = this.employees.find(
            (employee) => employee.username === userUpdate.username,
        );
        if (employeeToUpdate) {
            this.userService
                .updatePassword(employeeToUpdate)
                .pipe(takeUntilDestroyed(this.destroyRef))
                .subscribe();
        }
    }

    ngOnInit(): void {
        this.userService.getAllEmployee().subscribe((employees) => {
            this.employees = employees.filter(
                (employee) => employee.role.name === 'employee',
            );
            const employeeOptions = this.employees.map(
                (employee) => employee.username,
            );
            this.formModelUpdatePassword = [
                {
                    controlKey: 'username',
                    formFieldType: 'select',
                    selectOptions: employeeOptions,
                    label: 'employé',
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
            ];
        });
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
