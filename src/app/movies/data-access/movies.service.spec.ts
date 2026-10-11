import { TestBed } from '@angular/core/testing';

import { MoviesService } from './movies.service';
import { HttpClient } from '@angular/common/http';

describe('MoviesService', () => {
    let service: MoviesService;
    let mockHttpClient: HttpClient;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [{ provide: HttpClient, useValue: { get: jest.fn() } }],
        });
        service = TestBed.inject(MoviesService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
