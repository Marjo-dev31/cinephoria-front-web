import { MovieInterface } from "../../movies/models/movie.interface";
import { CurrentUserInterface, UserInterface } from "../../user/models/user.interface";

export interface ReviewCreateInterface {
    description: string;
    grade: number;
    movie: MovieInterface;
    user: CurrentUserInterface;
}

export interface ReviewUpdateInterface extends ReviewCreateInterface {
    is_Validated: boolean;
    id: string;
}

export interface ReviewInterface extends ReviewUpdateInterface {}


export interface ReviewFormInterface {
    description: string;
    grade: number;
    movie: string;
}