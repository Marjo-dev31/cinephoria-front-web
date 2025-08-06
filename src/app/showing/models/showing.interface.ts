import { MovieInterface } from "../../movies/models/movie.interface";
import { RoomInterface } from "../../room/models/room.interface";

export interface CreateShowingInterface {
  date: Date;
  startAt: string;
  endAt: string;
  movie: MovieInterface;
  room: RoomInterface;
  
}

export interface UpdateShowingInterface extends CreateShowingInterface{
  id: string
}

export interface ShowingInterface extends UpdateShowingInterface{}