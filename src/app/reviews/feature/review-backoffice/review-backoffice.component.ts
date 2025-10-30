import {
    Component,
    DestroyRef,
    inject,
    OnInit,
    signal,
} from '@angular/core';
import { DatatableComponent } from '../../../shared/ui/datatable/datatable.component';
import { ReviewInterface } from '../../models/review.interface';
import { ReviewService } from '../../data-access/reviews.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';

@Component({
    selector: 'app-review-backoffice',
    standalone: true,
    imports: [DatatableComponent],
    templateUrl: './review-backoffice.component.html',
})
export class ReviewBackofficeComponent implements OnInit {
    private readonly reviewService = inject(ReviewService);
    private readonly destroyRef = inject(DestroyRef);
    reviews: ReviewInterface[] = [];

    handleStatus(id: string) {
        const reviewToUpdate = this.reviews.find((review) => review.id === id);
        if (reviewToUpdate) {
            reviewToUpdate.is_Validated = !reviewToUpdate.is_Validated;
            this.reviewService
                .updateReviewStatus(reviewToUpdate)
                .pipe(
                    tap(() => this.getAllReviews()),
                    takeUntilDestroyed(this.destroyRef),
                )
                .subscribe();
        }
    }

    ngOnInit() {
        this.getAllReviews();
    }

    getAllReviews() {
        this.reviewService
            .getAllReviews()
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe((reviews) => (this.reviews = reviews));
    }

    displayColumns = signal([
        {
            key: 'username',
            label: 'pseudo',
            accessor: (row: ReviewInterface) => row.user?.username,
        },
        {
            key: 'description',
            label: 'avis',
            accessor: (row: ReviewInterface) => row.description,
        },
        {
            key: 'grade',
            label: 'note',
            accessor: (row: ReviewInterface) => row.grade,
        },
        {
            key: 'movie',
            label: 'film',
            accessor: (row: ReviewInterface) => row.movie.title,
        },
        {
            key: 'is_Validated',
            label: 'modération',
            accessor: (row: ReviewInterface) => row.is_Validated,
        },
    ]);
}
