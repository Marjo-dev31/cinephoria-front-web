import { SeatInterface } from "../../shared/models/seat.interface";

export interface OrderCreateInterface {
    quantity: number;
    total: number;
    showing: string;
    seat?: SeatInterface[];
}

export interface OrderUpdateInterface extends OrderCreateInterface {
    id: string;
}

export interface OrderInterface extends OrderUpdateInterface {}
