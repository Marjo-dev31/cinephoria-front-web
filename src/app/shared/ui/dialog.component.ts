import { DIALOG_DATA } from '@angular/cdk/dialog';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';
import { ShowingInterface } from '../../showing/models/showing.interface';
import { upcoming } from '../util/upcoming';

@Component({
    selector: 'app-dialog',
    imports: [DatePipe, CurrencyPipe],
    template: `
        <ng-container>
            <h2 class="text-center font-roboto text-2xl ">Séances à venir</h2>
            @for (showing of upcomingShowing(); track showing.id) {
                <div
                    class="border-2 border-darkblue rounded-lg w-fit *:pr-2 *:pl-2 hover:bg-peach"
                >
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
export class DialogComponent {
    data = inject(DIALOG_DATA);

    today = new Date();
    
    upcomingShowing = signal(
        this.data.showing.filter((showing: ShowingInterface) =>
            upcoming(showing.date),
        ),
    );
}
