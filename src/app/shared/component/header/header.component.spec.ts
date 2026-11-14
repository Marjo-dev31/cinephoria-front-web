import { ComponentFixture, TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from '@jest/globals';

import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { UserService } from '../../../user/data-access/user.service';
import { HeaderComponent } from './header.component';

let mockActivatedRoute;

describe('HeaderComponent', () => {
    let component: HeaderComponent;
    let fixture: ComponentFixture<HeaderComponent>;

    const mockUserService = {
        currentUser: new BehaviorSubject<any>({
            id: 1,
            username: 'testUser',
            role: 'admin',
        }),
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HeaderComponent],
            providers: [
                { provide: ActivatedRoute, useValue: mockActivatedRoute },
                { provide: UserService, useValue: mockUserService },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(HeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
