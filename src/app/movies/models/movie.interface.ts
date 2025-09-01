import { GenreInterface } from "../../shared/models/genre.interface"
import { ReviewInterface } from "../../reviews/models/review.interface"
import { ShowingInterface } from "../../showing/models/showing.interface"

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
  reviews: ReviewInterface[],
  showing: ShowingInterface[]
}
