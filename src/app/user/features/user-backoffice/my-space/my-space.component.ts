import {
    Component,
    DestroyRef,
    effect,
    inject,
    OnInit,
    signal,
} from '@angular/core';
import { OrderComponent } from '../../../../order/feature/order.component';
import { FormComponent } from '../../../../shared/ui/form/form.component';
import { DynamicControl } from '../../../../shared/models/form.interface';
import { Validators } from '@angular/forms';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { OrderService } from '../../../../order/data-access/order.service';
import { ReviewCreateInterface } from '../../../../reviews/models/review.interface';
import { MovieInterface } from '../../../../movies/models/movie.interface';
import { ReviewService } from '../../../../reviews/data-access/reviews.service';

@Component({
    selector: 'app-my-space-form',
    imports: [OrderComponent, FormComponent],
    template: `<div
        class="flex flex-col justify-center items-center m-auto w-2/3"
    >
        <h2 class="text-center text-4xl font-bold font-roboto p-4">
            Mon compte personnel
        </h2>
        <app-order
            [currentUser]="currentUser()"
            (onEditForm)="handleEditForm($event)"
        ></app-order>
        @if (displayFormReview()) {
            <div>
                <h3 class="font-bold text-2xl text-center p-4">
                    Laisser un avis
                </h3>
                <app-form
                    [formModelConfig]="formModelConfig"
                    (outputForm)="onAddReview($event)"
                ></app-form>
            </div>
        }
    </div>`,
})
export class MySpaceComponent implements OnInit {
    private readonly orderService = inject(OrderService);
    private readonly reviewService = inject(ReviewService);

    private readonly destroyRef = inject(DestroyRef);

    // recuperer current user and role
    currentUser = signal('ef8357b7-d6f0-48c3-b9b4-2c7f28df18ca');
    displayFormReview = signal(false);
    movie = signal<MovieInterface>({
        id: '',
    } as MovieInterface);
    formModelConfig: DynamicControl[] = [];
    orders = toSignal(this.orderService.getOrdersByUser(this.currentUser()), {
        initialValue: [],
    });

    handleEditForm(item: any) {
        this.displayFormReview.set(true);
        this.movie.set(item.showing.movie);
    }

    onAddReview(review: ReviewCreateInterface) {
        const newReview: ReviewCreateInterface = {
            description: review.description,
            grade: review.grade,
            movie: this.movie(),
            username: 'currentUser',
        };
        this.reviewService.addReview(newReview).subscribe();
    }

    effect = effect(() => console.log(this.orders()));

    ngOnInit(): void {
        this.orderService
            .getOrdersByUser(this.currentUser())
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe((orders) => {
                const orderFiltered = orders.filter(
                    (order) => new Date(order.showing.date) < new Date(),
                );
                const filmOptions = orderFiltered.map(
                    (order) => order.showing.movie?.title as string
                );
                if(filmOptions){
                    this.formModelConfig = [
                    {
                        controlKey: 'movie',
                        formFieldType: 'select',
                        label: 'film',
                        selectOptions: filmOptions,
                        defaultValue: '',
                        validators: [Validators.required],
                    },
                    {
                        controlKey: 'description',
                        formFieldType: 'textarea',
                        label: 'avis',
                        defaultValue: '',
                        validators: [Validators.required],
                    },
                    {
                        controlKey: 'grade',
                        formFieldType: 'input',
                        inputType: 'number',
                        label: 'note',
                        defaultValue: 0,
                        min: 0,
                        max: 5,
                        validators: [Validators.required],
                    },
                ];
                }
                
            });
    }
}
