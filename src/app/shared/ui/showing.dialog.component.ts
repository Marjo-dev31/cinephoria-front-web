import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, inject, output, signal } from '@angular/core';
import { HoursDisplayPipe } from '../util/pipes/hoursDisplay.pipe';

@Component({
    selector: 'app-dialog',
    imports: [DatePipe, CurrencyPipe, HoursDisplayPipe],
    template: `
        <ng-container>
            <h2 class="text-center font-roboto font-bold text-4xl ">
                Séances à venir
            </h2>
            @for (showing of data; track showing.id) {
                <ul
                    class="border-2 border-darkblue rounded-lg w-fit *:px-2 hover:bg-peach"
                    (click)="onRedirectToResa(showing.id)"
                >
                    <li class="pt-1">
                        Du {{ showing.date | date: 'dd/MM/yyyy' }}
                    </li>
                    <li>Début {{ showing.startAt | hoursDisplay }}</li>
                    <li>Fin {{ showing.endAt | hoursDisplay }}</li>
                    <li class="capitalize">
                        {{ showing.room.projectionQuality.quality }}
                    </li>
                    <li class="pb-1">
                        {{
                            showing.room.projectionQuality.price.price
                                | currency: 'EUR'
                        }}
                    </li>
                </ul>
            } @empty {
                <p class="text-center p-4">Trop tôt ou trop tard ?!</p>
                <p class="text-center">
                    Il n'y a pas de séance programmée pour ce film
                </p>
            }
        </ng-container>
    `,
    styles: [
        `
            :host {
                display: block;
                background: #d4d2a5;
                border-radius: 8px;
                padding: 16px;
                box-shadow: 5px 5px 15px 5px #001d3d;
            }
        `,
    ],
})
export class ShowingDialogComponent {
    private readonly dialogRef = inject(DialogRef);
    data = inject(DIALOG_DATA);

    onRedirectToResa(showingId: string) {
        this.dialogRef.close(showingId);
    }
}
