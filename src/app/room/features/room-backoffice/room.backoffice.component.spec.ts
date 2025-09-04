import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomBackofficeComponent } from './room.backoffice.component';

describe('RoombackofficeComponent', () => {
  let component: RoomBackofficeComponent;
  let fixture: ComponentFixture<RoomBackofficeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoomBackofficeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoomBackofficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
