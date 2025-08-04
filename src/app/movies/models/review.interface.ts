export interface ReviewCreateInterface {
    description: string;
    grade: number;
    is_Validated: boolean;
    movie: string;
}

export interface ReviewUpdateInterface extends ReviewCreateInterface {
    id: string;
}

export interface ReviewInterface extends ReviewUpdateInterface {}
