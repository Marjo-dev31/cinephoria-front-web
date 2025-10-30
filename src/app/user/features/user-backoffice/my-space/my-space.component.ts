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
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { OrderService } from '../../../../order/data-access/order.service';
import { ReviewCreateInterface, ReviewFormInterface } from '../../../../reviews/models/review.interface';
import { ReviewService } from '../../../../reviews/data-access/reviews.service';
import { OrderInterface } from '../../../../order/models/order.interface';
import {
    UserInterface,
} from '../../../models/user.interface';
import { ReviewsComponent } from '../../../../reviews/feature/review/reviews.component';
import { UserService } from '../../../data-access/user.service';
import { tap } from 'rxjs';

@Component({
    selector: 'app-my-space-form',
    imports: [OrderComponent, ReviewsComponent],
    template: `<div
        class="flex flex-col justify-center items-center m-auto md:w-2/3"
    >
        <h2 class="text-center text-4xl font-bold font-roboto p-4">
            Mon compte personnel
        </h2>
        <app-order [orders]="orders" class="w-full" />
        <div class="my-16">
            <app-reviews
                [formModelConfig]="formModelConfig"
                (outPutForm)="handleAddReview($event)"
            />
        </div>
    </div>`,
})
export class MySpaceComponent implements OnInit {
    private readonly orderService = inject(OrderService);
    private readonly reviewService = inject(ReviewService);
    private readonly userService = inject(UserService);
    private readonly destroyRef = inject(DestroyRef);

    readonly currentUser = toSignal(this.userService.currentUser, {initialValue:{
        id: '',
        username: '',
        role: '',
    }})

    formModelConfig: DynamicControl[] = [];
    orders: OrderInterface[] = [];

    handleAddReview(review: ReviewFormInterface) {
        const movieToReview = this.orders.find(
            (order) => order.showing.movie?.title.toLowerCase() === review.movie.toLowerCase(),
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

    ngOnInit(): void {
        this.orderService
            .getOrdersByUser(this.currentUser().id)
            .pipe(
                tap((orders)=>this.orders = orders),
                takeUntilDestroyed(this.destroyRef))
            .subscribe((orders) => {
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
