import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowingBackofficeComponent } from './showing-backoffice.component';
import { RoomService } from '../../../room/data-access/room.service';
import { ShowingService } from '../../data-access/showing.service';
import { MoviesService } from '../../../movies/data-access/movies.service';
import { of } from 'rxjs';

describe('ShowingBackofficeComponent', () => {
    let component: ShowingBackofficeComponent;
    let fixture: ComponentFixture<ShowingBackofficeComponent>;

    const mockRoomService = {
        getAllRooms: jest.fn(),
    };
    const mockShowingService = {
        getAllShowing: jest
            .fn()
            .mockReturnValue(of([{ room: { cinema: '', number: 0 } }])),
    };
    const mockMovieService = {
        getAllMovies: jest.fn(),
    };
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ShowingBackofficeComponent],
            providers: [
                { provide: RoomService, useValue: mockRoomService },
                { provide: ShowingService, useValue: mockShowingService },
                { provide: MoviesService, useValue: mockMovieService },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(ShowingBackofficeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
