import { MovieInterface } from "../../movies/models/movie.interface";

export interface ReviewCreateInterface {
    description: string;
    grade: number;
    is_Validated: boolean;
    movie: MovieInterface;
}

export interface ReviewUpdateInterface extends ReviewCreateInterface {
    id: string;
}

export interface ReviewInterface extends ReviewUpdateInterface {}
