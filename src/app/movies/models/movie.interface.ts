import { GenreInterface } from '../../shared/models/genre.interface';
import { ReviewInterface } from '../../reviews/models/review.interface';
import { ShowingInterface } from '../../showing/models/showing.interface';

export interface MovieCreateInterface {
    title: string;
    description: string;
    image_Url: string;
    minimum_Age: number;
    genre: GenreInterface;
    is_Favorite: boolean;
}

export interface MovieUpdateInterface extends MovieCreateInterface {
    id: string;
}

export interface MovieInterface extends MovieUpdateInterface {
    reviews: ReviewInterface[];
    showing: ShowingInterface[];
    create_At: Date;
}

export interface MovieDisplayFormInterface {
    title: string;
    description: string;
    minimum_Age: number;
    genre: string;
    is_Favorite: string;
    image_Url: string;
}

export interface MovieOnMongoInterface {
    _id: string;
    title: string;
    nbOfSales: number;
    create_At: Date;
}
