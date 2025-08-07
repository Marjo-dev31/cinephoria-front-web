import { Seat } from "../models/seat.interface";

   export const countSeat = (seat: Seat[]): number => {
        const isReserved = seat.map((seat) => seat.reserved);
        console.log(seat.length - isReserved.filter(Boolean).length)
        return seat.length - isReserved.filter(Boolean).length;
    }