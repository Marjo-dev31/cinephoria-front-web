import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackofficeComponent } from './backoffice.component';
import { UserService } from '../../../data-access/user.service';
import { BehaviorSubject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

describe('BackofficeComponent', () => {
    let component: BackofficeComponent;
    let fixture: ComponentFixture<BackofficeComponent>;

    const mockUserService = {
        currentUser: new BehaviorSubject({}),
    };

    const mockActivatedRoute = {
        snapshot: {
            paramMap: {
                get: (key: string) => (key === 'id' ? '42' : null),
            },
        },
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [BackofficeComponent],
            providers: [
                { provide: UserService, useValue: mockUserService },
                { provide: ActivatedRoute, useValue: mockActivatedRoute },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(BackofficeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
