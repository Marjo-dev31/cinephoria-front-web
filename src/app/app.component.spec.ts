import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { UserService } from './user/data-access/user.service';

describe('AppComponent', () => {
    let mockActivatedRoute;

    const mockUserService = {
        currentUser: new BehaviorSubject({})
    }

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AppComponent],
            providers: [
                { provide: ActivatedRoute, useValue: mockActivatedRoute },
                { provide: UserService, useValue: mockUserService },
            ],
        }).compileComponents();
    });

    it('should create the app', () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    });

    it(`should have the 'cinephoria-front' title`, () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.componentInstance;
        expect(app.title).toEqual('cinephoria-front');
    });
});
