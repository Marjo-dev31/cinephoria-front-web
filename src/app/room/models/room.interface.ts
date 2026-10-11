import { CinemaInterface } from '../../shared/models/cinema.interface';
import { ProjectionQualityInterface } from '../../shared/models/projectionQuality.interface';
import { ShowingInterface } from '../../showing/models/showing.interface';

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
    showing?: ShowingInterface[];
}

export interface RoomDiplayFormInterface {
    number: number;
    numberOfSeats: number;
    cinema: string;
    projectionQuality: string;
}
