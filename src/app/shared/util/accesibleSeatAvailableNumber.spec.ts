import { Seat } from '../models/seat.interface';
import { accessibleSeatAvailableNumber } from './accessibleSeatAvailableNumber';

describe('accessibleSeatAvailableNumber', () => {
    it('should return 0 when no seats are accessible', () => {
        const seats: Seat[] = [
            { id: '1', reserved: false, accessibleSeat: false, number: 1 },
            { id: '2', reserved: false, accessibleSeat: false, number: 2 },
        ];
        expect(accessibleSeatAvailableNumber(seats)).toBe(0);
    });

    it('should return total accessible seats when none are reserved', () => {
        const seats: Seat[] = [
            { id: '1', reserved: false, accessibleSeat: true, number: 1 },
            { id: '2', reserved: false, accessibleSeat: true, number: 2 },
        ];
        expect(accessibleSeatAvailableNumber(seats)).toBe(2);
    });

    it('should return 0 when all accessible seats are reserved', () => {
        const seats: Seat[] = [
            { id: '1', reserved: true, accessibleSeat: true, number: 1 },
            { id: '2', reserved: true, accessibleSeat: true, number: 2 },
        ];
        expect(accessibleSeatAvailableNumber(seats)).toBe(0);
    });

    it('should return correct count when some accessible seats are reserved', () => {
        const seats: Seat[] = [
            { id: '1', reserved: true, accessibleSeat: true, number: 1 },
            { id: '2', reserved: false, accessibleSeat: true, number: 2 },
            { id: '3', reserved: false, accessibleSeat: false, number: 3 },
            { id: '4', reserved: false, accessibleSeat: true, number: 4 },
        ];
        expect(accessibleSeatAvailableNumber(seats)).toBe(2);
    });

    it('should return 0 for empty array', () => {
        expect(accessibleSeatAvailableNumber([])).toBe(0);
    });

    it('should ignore seats with accessibleSeat undefined or false', () => {
        const seats: any[] = [
            { id: '1', reserved: false },
            { id: '2', reserved: false, accessibleSeat: false },
            { id: '3', reserved: false, accessibleSeat: true },
        ];
        expect(accessibleSeatAvailableNumber(seats)).toBe(1);
    });
});
