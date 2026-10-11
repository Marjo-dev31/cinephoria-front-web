import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorComponent } from './error.component';
import { ActivatedRoute } from '@angular/router';

describe('ErrorComponent', () => {
    let component: ErrorComponent;
    let fixture: ComponentFixture<ErrorComponent>;

    beforeEach(async () => {
        const mockActivatedRoute = {
            snapshot: {
                paramMap: {
                    get: (key: string) => (key === 'id' ? '42' : null),
                },
            },
        };

        await TestBed.configureTestingModule({
            imports: [ErrorComponent],
            providers: [
                { provide: ActivatedRoute, useValue: mockActivatedRoute },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(ErrorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
