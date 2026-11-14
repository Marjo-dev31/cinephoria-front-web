import { ComponentFixture, TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it, jest } from '@jest/globals';

import { DashboardComponent } from './dashboard.component';
import { MoviesService } from '../../../data-access/movies.service';
import { of } from 'rxjs';

jest.mock('chart.js', () => {
    const Chart = Object.assign(jest.fn(), { register: jest.fn() });

    return { Chart, registerables: [] };
});

describe('DashboardComponent', () => {
    let component: DashboardComponent;
    let fixture: ComponentFixture<DashboardComponent>;

    const mockMoviesService = {
        getAllSales: jest.fn().mockReturnValue(of([{}])),
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [DashboardComponent],
            providers: [
                { provide: MoviesService, useValue: mockMoviesService },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(DashboardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
