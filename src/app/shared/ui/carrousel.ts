import { Component, input } from '@angular/core';
import { MovieUpdateInterface } from '../../movies/movie.interface';
import { environment } from '../../../environments/environment';

@Component({
    selector: 'app-carousel',
    template: `
        <div
            class="flex flex-col items-center max-w-sm overflow-hidden space-y-6"
        >
            <div
                class="flex transition-transform duration-500 ease-in-out w-full"
                [style.transform]="transform"
            >
                <ul class="flex shrink-[{{currentIndex}}] items-center">
                    @for (item of items(); track $index) {
                        <li class="min-w-full">
                            <img
                                [src]="this.url + item.image_Url"
                                alt="Affiche des dernières sorties"
                                class="w-full"
                            />
                        </li>
                    }
                </ul>
            </div>
            <div class="flex space-x-10">
                <div (click)="previous()" class="">
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
                <div (click)="next()" class="">
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
        </div>
    `,
})
export class CarouselComponent {
    items = input.required<MovieUpdateInterface[]>();
    // check if it works in production
    url = `${environment.serverUrl}/uploads/`;

    currentIndex = 0;

    get transform() {
        return `translateX(-${this.currentIndex * 100}%)`;
    }

    previous() {
        if (this.currentIndex > 0) {
            this.currentIndex =
                (this.currentIndex - 1 + this.items().length) %
                this.items().length;
        } else {
            this.currentIndex = 0;
        }
        console.log(this.currentIndex);
    }

    next() {
        if (this.currentIndex < (this.items().length)-1) {
            this.currentIndex = (this.currentIndex + 1) % this.items().length;
            console.log(this.currentIndex);
        } else { this.currentIndex = 0 }
    }
}
