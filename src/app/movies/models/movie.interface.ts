import { GenreInterface } from "./genre.interface"
import { ReviewInterface } from "../../reviews/models/review.interface"

export interface MovieCreateInterface {
  title:string,
  description: string,
  image_Url: string,
  minimun_Age: number,
  genre: GenreInterface,
  is_Favorite: boolean
}

export interface MovieUpdateInterface extends MovieCreateInterface {
  id: string,
  create_At: Date,
}

export interface MovieInterface extends MovieUpdateInterface {
  reviews: ReviewInterface[]
}
