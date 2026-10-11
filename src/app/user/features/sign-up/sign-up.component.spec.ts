import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignUpComponent } from './sign-up.component';
import { UserService } from '../../data-access/user.service';
import { RoleService } from '../../data-access/role.service';
import { of } from 'rxjs';

describe('CreateUserComponent', () => {
    let component: SignUpComponent;
    let fixture: ComponentFixture<SignUpComponent>;

    const mockUserService = {
        addAccount: jest.fn(),
    };
    const mockRoleService = {
        getAllRole: jest.fn().mockReturnValue(of([{}])),
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [SignUpComponent],
            providers: [
                { provide: UserService, useValue: mockUserService },
                { provide: RoleService, useValue: mockRoleService },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(SignUpComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
