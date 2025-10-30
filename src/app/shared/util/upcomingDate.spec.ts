import { upcomingDate } from './upcomingDate';

describe('upcoming', () => {
  it('should return true for a future date', () => {
    const futureDate = new Date(Date.now() + 1000 * 60 * 60);
    expect(upcomingDate(futureDate)).toBe(true);
  });

  it('should return false for a past date', () => {
    const pastDate = new Date(Date.now() - 1000 * 60 * 60);
    expect(upcomingDate(pastDate)).toBe(false);
  });

  it('should return true for the current date/time', () => {
    const now = new Date();
    expect(upcomingDate(now)).toBe(true);
  });
});