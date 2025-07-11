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
                <ul class="flex shrink-[{{ currentIndex }}] items-center">
                    @for (item of items(); track $index) {
                        <li class="min-w-full">
                            <img
                                [src]="this.url + item.image_Url"
                                [alt]="'Affiche du film' + item.title"
                                class="w-full"
                            />
                        </li>
                    }
                </ul>
            </div>
            <div class="flex space-x-10">
                <button
                    (click)="previous()"
                    [tabIndex]="0"
                    (keyup.enter)="previous()"
                    [disabled]="currentIndex === 0"
                    class="cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
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
                </button>
                <button (click)="next()" [tabIndex]="0" (keyup.enter)="next()"
                class="cursor-pointer ">
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
                </button>
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
            this.currentIndex =
                (this.currentIndex - 1 + this.items().length) %
                this.items().length;
    }

    next() {
        if (this.currentIndex < this.items().length - 1) {
            this.currentIndex = (this.currentIndex + 1) % this.items().length;
        } else {
            this.currentIndex = 0;
        }
    }
}
