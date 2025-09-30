import {
    Component,
    DestroyRef,
    effect,
    inject,
    OnInit,
    signal,
} from '@angular/core';
import { OrderComponent } from '../../../../order/feature/order.component';
import { DynamicControl } from '../../../../shared/models/form.interface';
import { Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { OrderService } from '../../../../order/data-access/order.service';
import { ReviewCreateInterface } from '../../../../reviews/models/review.interface';
import { ReviewService } from '../../../../reviews/data-access/reviews.service';
import { OrderInterface } from '../../../../order/models/oder.interface';
import { UserInterface } from '../../../models/user.interface';
import { ReviewsComponent } from '../../../../reviews/feature/review/reviews.component';

@Component({
    selector: 'app-my-space-form',
    imports: [OrderComponent, ReviewsComponent],
    template: `<div
        class="flex flex-col justify-center items-center m-auto w-2/3"
    >
        <h2 class="text-center text-4xl font-bold font-roboto p-4">
            Mon compte personnel
        </h2>
        <app-order [orders]="orders" class="w-full"/>
        <div class="my-4">
            <app-reviews [formModelConfig]="formModelConfig" (outPutForm)="handleAddReview($event)"/>
        </div>
    </div>`,
})
export class MySpaceComponent implements OnInit {
    private readonly orderService = inject(OrderService);
    private readonly reviewService = inject(ReviewService);
    private readonly destroyRef = inject(DestroyRef);

    // recuperer current user and role
    currentUser = signal({
        id: 'ef8357b7-d6f0-48c3-b9b4-2c7f28df18ca',
        username: 'nico',
    } as UserInterface);
    formModelConfig: DynamicControl[] = [];
    orders: OrderInterface[] = [];

    handleAddReview(review: ReviewCreateInterface) {
        console.log(review, 'review');
        const movieToReview = this.orders.find(
            (order) => order.showing.movie?.title === review.movie.title,
        )?.showing.movie;
        if (movieToReview) {
            const newReview: ReviewCreateInterface = {
                description: review.description,
                grade: review.grade,
                movie: movieToReview,
                user: this.currentUser(),
            };
            this.reviewService
                .addReview(newReview)
                .pipe(takeUntilDestroyed(this.destroyRef))
                .subscribe();
        }
    }

    effect = effect(() => console.log(this.orders));

    ngOnInit(): void {
        this.orderService
            .getOrdersByUser(this.currentUser().id)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe((orders) => {
                this.orders = orders;

                const orderFiltered = orders.filter(
                    (order) => new Date(order.showing.date) < new Date(),
                );
                const filmOptions = orderFiltered.map(
                    (order) => order.showing.movie?.title as string,
                );
                if (filmOptions) {
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
