import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoombackofficeComponent } from './room.backoffice.component';

describe('RoombackofficeComponent', () => {
  let component: RoombackofficeComponent;
  let fixture: ComponentFixture<RoombackofficeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoombackofficeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoombackofficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
