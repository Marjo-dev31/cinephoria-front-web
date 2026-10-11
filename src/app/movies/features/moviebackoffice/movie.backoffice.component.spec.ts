import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MovieBackofficeComponent } from './movie.backoffice.component';
import { MoviesService } from '../../data-access/movies.service';
import { of } from 'rxjs';
import { GenreService } from '../../../shared/data-access/genre.service';
import { UploadService } from '../../../shared/data-access/upload.service';

describe('MovieBackofficeComponent', () => {
    let component: MovieBackofficeComponent;
    let fixture: ComponentFixture<MovieBackofficeComponent>;
    const mockMoviesService = {
        getAllMovies: jest.fn().mockReturnValue(
            of([
                {
                    id: '',
                    title: '',
                    description: '',
                    minimum_Age: 0,
                    image_Url: '',
                    genre: { id: '', title: '' },
                    reviews: [],
                    showing: [],
                    is_Favorite: false,
                    create_At: new Date(),
                },
            ]),
        ),
    };
    const mockGenreService = {
        getAllGenre: jest
            .fn()
            .mockReturnValue(of([{ id: '1', title: 'comédie' }])),
    };
    const mockUploadService = {
        addImage: jest.fn().mockReturnValue(of({})),
    };
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [MovieBackofficeComponent],
            providers: [
                { provide: MoviesService, useValue: mockMoviesService },
                { provide: GenreService, useValue: mockGenreService },
                { provide: UploadService, useValue: mockUploadService },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(MovieBackofficeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
