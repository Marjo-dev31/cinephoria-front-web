import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviesComponent } from './movies.component';

import { of } from 'rxjs';
import { MoviesService } from '../data-access/movies.service';
import { ReviewService } from '../../reviews/data-access/reviews.service';

describe('MoviesComponent', () => {
    let component: MoviesComponent;
    let fixture: ComponentFixture<MoviesComponent>;

    const mockMovieService = {
        getAllMovies: jest.fn().mockReturnValue(
            of([
                {
                    id: 'A',
                    title: 'testtitle',
                    genre: { title: 'testgenretitle' },
                    reviews: [],
                    showing: [],
                },
            ]),
        ),
    };

    const mockReviewService = {
        getAllReviews: jest
            .fn()
            .mockReturnValue(
                of([{ id: '1', description: 'testdescription', movie: 'A' }]),
            ),
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [MoviesComponent],
            providers: [
                { provide: MoviesService, useValue: mockMovieService },
                { provide: ReviewService, useValue: mockReviewService },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(MoviesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
