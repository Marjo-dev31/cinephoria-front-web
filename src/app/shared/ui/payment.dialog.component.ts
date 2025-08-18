import { DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ShowingInterface } from '../../showing/models/showing.interface';
import { upcoming } from '../util/upcomingDate';
import { FormGroup } from '@angular/forms';
import { FormComponent } from './form/form.component';

@Component({
    selector: 'app-payment-dialog',
    imports: [FormComponent],
    template: `
        <ng-container>
            <h2 class="text-center font-roboto font-bold text-4xl ">
                Paiement
            </h2>
            <app-form
                [formModelConfig]="data.form"
                (outputForm)="addReservation($event)"
            ></app-form>
        </ng-container>
    `,
    styles: [
        `
            :host {
                display: block;
                background: #F7F7F7;
                border-radius: 8px;
                padding: 16px;
                box-shadow: 5px 5px 15px 5px #001d3d;
            }
        `,
    ],
})
export class PayementDialogComponent {
    data = inject(DIALOG_DATA);
    form = this.data.form;

    addReservation(credentials: []) {
        console.log('Réservation faite', credentials);
    }

}
