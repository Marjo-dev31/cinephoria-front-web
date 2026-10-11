import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReviewsComponent } from './reviews.component';

describe('ReviewsComponent', () => {
    let component: ReviewsComponent;
    let fixture: ComponentFixture<ReviewsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ReviewsComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(ReviewsComponent);
        component = fixture.componentInstance;

        fixture.componentRef.setInput('formModelConfig', [])
        fixture.detectChanges();
    });

    it('should create', () => {
      
        expect(component).toBeTruthy();
    });
});
