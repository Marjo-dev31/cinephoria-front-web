import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserBackofficeComponent } from './user-backoffice.component';

describe('UserBackofficeComponent', () => {
  let component: UserBackofficeComponent;
  let fixture: ComponentFixture<UserBackofficeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserBackofficeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserBackofficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
