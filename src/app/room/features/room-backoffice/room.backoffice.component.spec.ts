import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RoomBackofficeComponent } from './room.backoffice.component';
import { ProjectionQualityService } from '../../../shared/data-access/projectionQuality.service';
import { of } from 'rxjs';
import { ShowingService } from '../../../showing/data-access/showing.service';
import { CinemaService } from '../../../shared/data-access/cinema.service';
import { RoomService } from '../../data-access/room.service';

describe('RoombackofficeComponent', () => {
    let component: RoomBackofficeComponent;
    let fixture: ComponentFixture<RoomBackofficeComponent>;

    const mockShowingService = {
        getShowingByRoomId: jest.fn().mockReturnValue(of([{}])),
    };
    const mockCinemaService = {
        getAllCinema: jest.fn().mockReturnValue(of([{}])),
    };
    const mockprojectionQualityService = {
        getAllProjectionQuality: jest.fn().mockReturnValue(of([{}])),
    };
    const mockRoomService = {
        getAllRooms: jest
            .fn()
            .mockReturnValue(of([{ projectionQuality: { quality: '' } }])),
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RoomBackofficeComponent],
            providers: [
                { provide: ShowingService, useValue: mockShowingService },
                { provide: CinemaService, useValue: mockCinemaService },
                {
                    provide: ProjectionQualityService,
                    useValue: mockprojectionQualityService,
                },
                { provide: RoomService, useValue: mockRoomService },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(RoomBackofficeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
