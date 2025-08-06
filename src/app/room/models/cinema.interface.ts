export interface CreateCinemaInterface {
    city: string;
    country?: { id: string; name: string };
}

export interface UpdateCinemaInterface extends CreateCinemaInterface {
    id: string;
}

export interface CinemaInterface extends UpdateCinemaInterface {}
