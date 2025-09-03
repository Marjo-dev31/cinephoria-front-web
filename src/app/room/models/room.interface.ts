import { CinemaInterface } from "../../shared/models/cinema.interface";
import { ProjectionQualityInterface } from "../../shared/models/projectionQuality.interface";

export interface CreateRoomInterface {
  number: number;
  numberOfSeats: number;
  cinema: CinemaInterface;
  projectionQuality: ProjectionQualityInterface;
}

export interface UpdateRoomInterface extends CreateRoomInterface {
  id: string;
}

export interface RoomInterface extends UpdateRoomInterface {
  
}
