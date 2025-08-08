import { Seat } from '../models/seat.interface';

export const accessibleSeatAvailableNumber = (seats: Seat[]): number => {
    return seats.filter((seat) => seat.accessibleSeat && !seat.reserved).length;
};
