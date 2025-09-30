import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateEmployeeComponent } from './create-employee.component';
import { RoleService } from '../../../data-access/role.service';
import { UserService } from '../../../data-access/user.service';

describe('CreateEmployeeComponent', () => {
    let component: CreateEmployeeComponent;
    let fixture: ComponentFixture<CreateEmployeeComponent>;

    const mockRoleService = {
        getAllRole: jest.fn(),
    };
    const mockUserService = {
        addEmployeeAccount: jest.fn(),
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CreateEmployeeComponent],
            providers: [{ provide: RoleService, useValue: mockRoleService },{ provide: UserService, useValue: mockUserService }],
        }).compileComponents();

        fixture = TestBed.createComponent(CreateEmployeeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
