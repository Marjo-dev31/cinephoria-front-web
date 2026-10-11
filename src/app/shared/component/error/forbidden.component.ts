import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-forbidden',
    imports: [RouterLink],
    template: `<div
        class="m-10 space-y-2 text-pretty flex flex-col justify-center items-center"
    >
        <h2 class="text-2xl font-coustard font-bold">
            Vous n'êtes pas autorisé à faire cette action
        </h2>
        <a [routerLink]="['/']" class="underline text-center"
            >Revenir à l'accueil</a
        >
    </div>`,
    styles: '',
})
export class ForbiddenComponent {}
