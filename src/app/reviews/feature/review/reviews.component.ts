import { Component, input, output } from '@angular/core';
import { FormComponent } from '../../../shared/ui/form/form.component';
import { DynamicControl } from '../../../shared/models/form.interface';
import { ReviewCreateInterface } from '../../models/review.interface';

@Component({
    selector: 'app-reviews',
    standalone: true,
    imports: [FormComponent],
    template: `<h3 class="font-bold text-2xl text-center">
            Laisser un avis sur un film
        </h3>
        <p class="text-sm italic text-center pb-2">
            (seulement sur les films des séances passées)
        </p>
        <app-form
            [formModelConfig]="formModelConfig()"
            (outputForm)="handleAddReview($event)"
        ></app-form>`,
})
export class ReviewsComponent {
    formModelConfig = input.required<DynamicControl[]>();
    outPutForm = output<ReviewCreateInterface>();

    handleAddReview(review: ReviewCreateInterface){
     this.outPutForm.emit(review)
    }
}
