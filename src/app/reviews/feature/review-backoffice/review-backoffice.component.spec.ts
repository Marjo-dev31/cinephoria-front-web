import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewBackofficeComponent } from './review-backoffice.component';

describe('ReviewBackofficeComponent', () => {
  let component: ReviewBackofficeComponent;
  let fixture: ComponentFixture<ReviewBackofficeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReviewBackofficeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewBackofficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
