import { inject, Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Review } from '../models/interfaces';

@Injectable({ providedIn: 'root' })
export class ReviewService {
    private api = inject(ApiService);

    getElectricianReviews(id: number) {
        return this.api.get<Review[]>(`/reviews/electrician/${id}`);
    }

    addReview(data: { electricianId: number, rating: number, comment: string }) {
        return this.api.post<Review>('/reviews', data);
    }
}
