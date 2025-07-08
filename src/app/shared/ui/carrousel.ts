import { Component, effect, input } from '@angular/core';
import { MovieUpdateInterface } from '../../movies/movie.interface';
import { environment } from '../../../environments/environment';

@Component({
    selector: 'app-carousel',
    template: `
        <div class="flex items-center space-x-8 mb-10">
            <div class="">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                    class="size-8 text-peach"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                    />
                </svg>
            </div>
            <ul class="flex flex-row space-x-4">
                @for (item of items(); track $index) {
                    <li>
                        <img
                            [src]="this.url + item.image_Url"
                            alt="Affiche des dernières sorties"
                        />
                    </li>
                }
            </ul>
            <div (click)="next()">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                    class="size-8 text-peach"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                    />
                </svg>
            </div>
        </div>
    `,
})
export class CarouselComponent {
    items = input<MovieUpdateInterface[]>();
    url = `${environment.serverUrl}/upload/`;

    itemssignal = effect(() => console.log(this.items(), this.url));

    next() {
      
    }
}
