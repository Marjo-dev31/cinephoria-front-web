import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowingComponent } from './showing.component';
import { BehaviorSubject, of } from 'rxjs';
import { ShowingService } from '../data-access/showing.service';
import { CinemaService } from '../../shared/data-access/cinema.service';
import { SeatService } from '../../shared/data-access/seat.service';
import { OrderService } from '../../order/data-access/order.service';
import { UserService } from '../../user/data-access/user.service';
import { ActivatedRoute } from '@angular/router';

describe('ShowingComponent', () => {
    let component: ShowingComponent;
    let fixture: ComponentFixture<ShowingComponent>;

    const mockShowingService = {
        getAllShowing: jest.fn().mockReturnValue(of([{room:{cinema:''}}])),
    };
    const mockCinemaService = {
        getAllCinema: jest.fn().mockReturnValue(of([{}])),
    };
    const mockSeatService = {
        updateSeat: jest.fn().mockReturnValue(of({})),
    };
    const mockOderService = {
        addOrder: jest.fn().mockReturnValue(of({})),
    };
    const mockUserService = {
        currentUser: new BehaviorSubject<any>({
            id: 1,
            username: 'testUser',
            role: 'admin',
        }),
    };
    const mockActivatedRoute = {
        queryParams: of({ data: '2', seat: '1' }),
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ShowingComponent],
            providers: [
                { provide: ShowingService, useValue: mockShowingService },
                { provide: CinemaService, useValue: mockCinemaService },
                { provide: SeatService, useValue: mockSeatService },
                { provide: OrderService, useValue: mockOderService },
                { provide: UserService, useValue: mockUserService },
                { provide: ActivatedRoute, useValue: mockActivatedRoute },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(ShowingComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
