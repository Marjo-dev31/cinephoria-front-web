import { CinemaInterface } from "./cinema.interface";

export interface CreateRoomInterface {
  number: number;
  numberOfSeats: number;
  cinema: CinemaInterface
}

export interface UpdateRoomInterface extends CreateRoomInterface {
  id: string;
}

export interface RoomInterface extends UpdateRoomInterface {}
