import { DIALOG_DATA } from '@angular/cdk/dialog';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';

@Component({
    selector: 'app-dialog',
    imports: [DatePipe, CurrencyPipe],
    template: `
        <ng-container>
            <h2 class="text-center font-roboto text-2xl ">Séances</h2>
            @for (showing of data.showing; track showing.id) {
                <div class="border-2 border-darkblue w-fit *:pr-2 *:pl-2">
                    <p>Du {{ showing.date | date: 'd/MM/yyyy' }}</p>
                    <p>Début {{ showing.startAt }}</p>
                    <p>Fin {{ showing.endAt }}</p>
                    <p>{{ showing.room.projectionQuality.quality }}</p>
                    <p>
                        {{
                            showing.room.projectionQuality.price.price
                                | currency
                        }}
                    </p>
                </div>
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
            }
        `,
    ],
})
export class DialogComponent {
    data = inject(DIALOG_DATA);
}
