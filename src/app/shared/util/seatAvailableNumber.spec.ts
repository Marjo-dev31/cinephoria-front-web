
import { SeatInterface } from '../models/seat.interface';
import { seatAvailableNumber } from './seatAvailableNumber';

describe('seatAvailableNumber', () => {
    it('should return total seats when none are reserved', () => {
        const seats: SeatInterface[] = [
            { id: '1', reserved: false, number: 1, accessibleSeat: false },
            { id: '2', reserved: false, number: 2, accessibleSeat: false },
            { id: '3', reserved: false, number: 3, accessibleSeat: false },
        ];
        expect(seatAvailableNumber(seats)).toBe(3);
    });

    it('should return 0 when all seats are reserved', () => {
        const seats: SeatInterface[] = [
            { id: '1', reserved: true, number: 1, accessibleSeat: false },
            { id: '2', reserved: true , number: 2, accessibleSeat: false},
        ];
        expect(seatAvailableNumber(seats)).toBe(0);
    });

    it('should return correct count when some seats are reserved', () => {
        const seats: SeatInterface[] = [
            { id: '1', reserved: true, number: 1, accessibleSeat: false },
            { id: '2', reserved: false, number: 2, accessibleSeat: false },
            { id: '3', reserved: true , number: 3, accessibleSeat: false},
            { id: '4', reserved: false, number: 4, accessibleSeat: false },
        ];
        expect(seatAvailableNumber(seats)).toBe(2);
    });

    it('should return 0 for empty array', () => {
        expect(seatAvailableNumber([])).toBe(0);
    });

    it('should ignore undefined reserved values and count them as not reserved', () => {
        const seats: any[] = [
            { id: '1' },
            { id: '2', reserved: true },
        ];
        expect(seatAvailableNumber(seats)).toBe(1);
    });
});
