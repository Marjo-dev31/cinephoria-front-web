import { AveragePipe } from './average.pipe';
import { ReviewInterface } from '../../reviews/models/review.interface';

describe('AveragePipe', () => {
  let pipe: AveragePipe;

  beforeEach(() => {
    pipe = new AveragePipe();
  });

  it('should return 0 when reviews list is empty', () => {
    const result = pipe.transform([]);
    expect(result).toBe(0);
  });

  it('should return the average of grades', () => {
    const reviews: ReviewInterface[] = [
      { id: '1', description: 'Good', grade: 4, is_Validated: true, movie: 'A' },
      { id: '2', description: 'Excellent', grade: 5, is_Validated: true, movie: 'A' },
      { id: '3', description: 'Average', grade: 3, is_Validated: true, movie: 'A' },
    ];
    const result = pipe.transform(reviews);
    expect(result).toBeCloseTo(4);
  });

  it('should handle single review correctly', () => {
    const reviews: ReviewInterface[] = [
      { id: '1', description: 'Only one', grade: 4, is_Validated: true, movie: 'A' },
    ];
    const result = pipe.transform(reviews);
    expect(result).toBe(4);
  });
});