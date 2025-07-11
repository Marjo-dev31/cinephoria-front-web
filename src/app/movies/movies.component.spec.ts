import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviesComponent } from './movies.component';
import { MoviesService } from './movies.service';
import { of } from 'rxjs';

describe('MoviesComponent', () => {
    let component: MoviesComponent;
    let fixture: ComponentFixture<MoviesComponent>;

    const mockMovieService = {
        getAllMovies: jest
            .fn()
            .mockReturnValue(
                of([
                    {
                        id: 'A',
                        title: 'testtitle',
                        genre: { title: 'testgenretitle' },
                    },
                ]),
            ),
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [MoviesComponent],
            providers: [{ provide: MoviesService, useValue: mockMovieService }],
        }).compileComponents();

        fixture = TestBed.createComponent(MoviesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
