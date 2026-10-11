import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateEmployeeComponent } from './create-employee.component';
import { RoleService } from '../../../data-access/role.service';
import { UserService } from '../../../data-access/user.service';
import { of } from 'rxjs';

describe('CreateEmployeeComponent', () => {
    let component: CreateEmployeeComponent;
    let fixture: ComponentFixture<CreateEmployeeComponent>;

    const mockRoleService = {
        getAllRole: jest.fn().mockReturnValue(of([{}])),
    };
    const mockUserService = {
        getAllEmployee: jest.fn().mockReturnValue(of([{}])),
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
