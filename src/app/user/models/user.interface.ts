import { ReviewInterface } from '../../reviews/models/review.interface';
import { RoleInterface } from './role.interface';

export interface UserCreateInterface {
    firstname: string;
    lastname: string;
    mail: string;
    username: string;
    role: RoleInterface;
    password: string;
}
export interface UserUpdateInterface extends UserCreateInterface {
    id: string;
}

export interface UserInterface extends UserUpdateInterface {
    reviews?: ReviewInterface;
}

export interface LoginCredantialInterface {
    mail: string;
    password: string;
}

export interface CurrentUserInterface {
    id: string;
    username: string;
    role: string;
}
