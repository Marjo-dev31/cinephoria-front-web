import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieBackofficeComponent } from './movie.backoffice.component';

describe('MovieBackofficeComponent', () => {
  let component: MovieBackofficeComponent;
  let fixture: ComponentFixture<MovieBackofficeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieBackofficeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieBackofficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
