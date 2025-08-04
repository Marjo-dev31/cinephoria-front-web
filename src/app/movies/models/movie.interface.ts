import { GenreInterface } from "./genre.interface"
import { ReviewInterface } from "./review.interface"

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
  reviews: ReviewInterface[]
}

export interface MovieInterface extends MovieUpdateInterface {}
