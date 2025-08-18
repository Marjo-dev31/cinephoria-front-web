import { SeatInterface } from '../models/seat.interface';

export const accessibleSeatAvailableNumber = (seats: SeatInterface[]): number => {
    return seats.filter((seat) => seat.accessibleSeat && !seat.reserved).length;
};
