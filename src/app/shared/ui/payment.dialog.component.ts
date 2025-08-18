import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, Inject, inject, output, signal } from '@angular/core';
import { FormComponent } from './form/form.component';

@Component({
    selector: 'app-payment-dialog',
    imports: [FormComponent],
    template: `
        <ng-container>
            <div class="relative">
                <h2 class="text-center font-roboto font-bold text-4xl ">
                    Paiement
                </h2>
                <div class="absolute top-0 right-0" (click)="onClose()">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="size-8"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                    </svg>
                </div>
                <app-form
                    [formModelConfig]="data"
                    (outputForm)="addReservation($event)"
                ></app-form>
            </div>
        </ng-container>
    `,
    styles: [
        `
            :host {
                display: block;
                background: #f7f7f7;
                border-radius: 8px;
                padding: 16px;
                box-shadow: 5px 5px 15px 5px #001d3d;
            }
        `,
    ],
})
export class PayementDialogComponent {
    private readonly dialogRef = inject(DialogRef);

    data = inject(DIALOG_DATA) || [];

    isValidated = signal(false);

    addReservation(credentials: []) {
        console.log('Réservation faite', credentials);
        this.isValidated.set(true);
        this.dialogRef.close(this.isValidated());
    }

    onClose() {
        this.dialogRef.close(this.isValidated());
    }
}
