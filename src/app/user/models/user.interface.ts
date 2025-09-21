import { ReviewInterface } from "../../reviews/models/review.interface";
import { RoleInterface } from "./role.interface";

export interface AllUserCreateInterface {
  firstname: string;
  lastname: string;
  mail: string;
  password: string;
}

export interface EmployeeCreateInterface extends AllUserCreateInterface {
  role: RoleInterface;
}

export interface EmployeeUpdateInterface extends EmployeeCreateInterface {
  id: string
}

export interface EmployeeInterface extends EmployeeUpdateInterface {
}

export interface UserCreateInterface extends AllUserCreateInterface{
  username: string;
}

export interface UserUpdateInterface extends UserCreateInterface {
  id: string
}

export interface UserInterface extends UserUpdateInterface {
  reviews: ReviewInterface
}
