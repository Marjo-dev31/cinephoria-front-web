import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { AveragePipe } from './average.pipe';

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
    const reviews = [
      { grade: 4 },
      { grade: 5 },
      { grade: 3 },
    ];
    const result = pipe.transform(reviews);
    expect(result).toBeCloseTo(4);
  });

  it('should handle single review correctly', () => {
    const reviews = [
      { grade: 4 },
    ];
    const result = pipe.transform(reviews);
    expect(result).toBe(4);
  });
});
