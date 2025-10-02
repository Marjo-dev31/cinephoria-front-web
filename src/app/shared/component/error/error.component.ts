import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-error',
    imports: [RouterLink],
    template: `<div
        class="m-10 space-y-2 text-pretty flex flex-col justify-center items-center"
    >
        <h2 class="text-2xl font-coustard font-bold">
            Oups une erreur est survenue !
        </h2>
        <p>Nous faisons tout pour régler le problème</p>
        <a [routerLink]="['/']" class="underline text-center"
            >Revenir à l'accueil</a
        >
    </div>`,
    styles: '',
})
export class ErrorComponent {}
