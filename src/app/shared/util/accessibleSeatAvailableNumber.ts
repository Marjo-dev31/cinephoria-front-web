import { SeatInterface } from '../models/seat.interface';

export const accessibleSeatAvailableNumber = (seats: Pick<SeatInterface, 'accessibleSeat' | 'reserved'>[]): number => {
    return seats.filter((seat) => seat.accessibleSeat && !seat.reserved).length;
};
