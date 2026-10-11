import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { ReviewCreateInterface, ReviewInterface, ReviewUpdateInterface } from '../models/review.interface';

@Injectable({
    providedIn: 'root',
})
export class ReviewService {
    private readonly url = `${environment.serverUrl}/reviews`;
    private readonly http = inject(HttpClient);

    getAllReviews(): Observable<ReviewInterface[]> {
        return this.http.get<ReviewInterface[]>(this.url);
    }

    updateReviewStatus(review: ReviewUpdateInterface): Observable<ReviewInterface>{
        return this.http.patch<ReviewInterface>(`${this.url}/${review.id}`, review )
    }

    addReview(review: ReviewCreateInterface): Observable<ReviewInterface>{
        return this.http.post<ReviewInterface>(this.url, review)
    }
}
