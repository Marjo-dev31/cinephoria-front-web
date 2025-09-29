import { MovieInterface } from "../../movies/models/movie.interface";

export interface ReviewCreateInterface {
    description: string;
    grade: number;
    movie: MovieInterface;
    username: string;
}

export interface ReviewUpdateInterface extends ReviewCreateInterface {
    is_Validated: boolean;
    id: string;
}

export interface ReviewInterface extends ReviewUpdateInterface {}
