import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewBackofficeComponent } from './review-backoffice.component';
import { of } from 'rxjs';
import { ReviewService } from '../../data-access/reviews.service';

describe('ReviewBackofficeComponent', () => {
    let component: ReviewBackofficeComponent;
    let fixture: ComponentFixture<ReviewBackofficeComponent>;

    const mockReviewService = {
        getAllReviews: jest.fn().mockReturnValue(of([{movie:{title:""}}])),
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ReviewBackofficeComponent],
            providers: [
                { provide: ReviewService, useValue: mockReviewService },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(ReviewBackofficeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
