export interface IMovie {
    title: string;
    url: string;
    imageUrl: string;
    releaseDate: string;
    relevantGenres: string[];
    duration: number | string;
    description: string;
    rating: number | string;
}