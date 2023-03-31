export interface Breed {
    id: string;
    name: string;
    description: string;
    image: CatImage,
    country_code: string;
    origin: string;
    temperament: string
    life_span: string;

    //ratings
    adaptability: number;
    affection_level: number;
    child_friendly: number;
    shedding_level: number;
    intelligence: number;
    health_issues: number;
    social_needs: number;
    stranger_friendly: number;
}

export interface CatImage {
    id: string;
    width: number;
    height: number;
    url: string;
}


