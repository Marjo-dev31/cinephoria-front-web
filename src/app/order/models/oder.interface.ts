import { SeatInterface } from "../../shared/models/seat.interface";
import { ShowingInterface } from "../../showing/models/showing.interface";
import { UserInterface } from "../../user/models/user.interface";

export interface OrderCreateInterface {
    quantity: number;
    total: number;
    showing: ShowingInterface;
    seat?: SeatInterface[];
    user: string;
}

export interface OrderUpdateInterface extends OrderCreateInterface {
    id: string;
}

export interface OrderInterface extends OrderUpdateInterface {}
