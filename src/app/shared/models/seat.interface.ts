import { OrderInterface } from '../../order/models/oder.interface';

export interface SeatCreatInterface {
    number: number;
    accessibleSeat: boolean;
    reserved: boolean;
}

export interface SeatUpdateInterface extends SeatCreatInterface {
    id: string;
    order: OrderInterface;
}

export interface SeatInterface extends SeatUpdateInterface {}
