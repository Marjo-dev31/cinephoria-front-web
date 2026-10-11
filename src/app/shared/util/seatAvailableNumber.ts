import { SeatInterface } from "../models/seat.interface";

   export const seatAvailableNumber = (seat: SeatInterface[]): number => {
        const isReserved = seat.map((seat) => seat.reserved);
        return seat.length - isReserved.filter(Boolean).length;
    }