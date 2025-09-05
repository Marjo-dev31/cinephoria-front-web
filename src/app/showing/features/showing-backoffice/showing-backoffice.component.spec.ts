import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowingBackofficeComponent } from './showing-backoffice.component';

describe('ShowingBackofficeComponent', () => {
  let component: ShowingBackofficeComponent;
  let fixture: ComponentFixture<ShowingBackofficeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowingBackofficeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowingBackofficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
