import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';

import { environment } from '../../environments/environment';
import { of } from 'rxjs';
import { MoviesService } from '../movies/data-access/movies.service';

describe('HomeComponent', () => {
    let component: HomeComponent;
    let fixture: ComponentFixture<HomeComponent>;

    const mockMoviesService = {
        getAllMovies: jest
            .fn()
            .mockReturnValue(
                of([
                    {
                        title: 'test',
                        description: 'test',
                        minimun_Age: 0,
                        is_Favorite: false,
                        imag_Url: 'test.jpg',
                    },
                ]),
            ),
    };

    beforeEach(async () => {
        environment.serverUrl = 'http://fake-url.test';
        await TestBed.configureTestingModule({
            imports: [HomeComponent],
            providers: [
                { provide: MoviesService, useValue: mockMoviesService },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(HomeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
