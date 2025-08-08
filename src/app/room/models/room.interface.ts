import { CinemaInterface } from "../../shared/models/cinema.interface";
import { ProjectionQuality } from "../../shared/models/projectionQuality.interface";

export interface CreateRoomInterface {
  number: number;
  numberOfSeats: number;
  cinema: CinemaInterface
}

export interface UpdateRoomInterface extends CreateRoomInterface {
  id: string;
}

export interface RoomInterface extends UpdateRoomInterface {
  projectionQuality: ProjectionQuality
}
