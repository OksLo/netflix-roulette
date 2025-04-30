export interface IMovie {
    id?: number;
    title: string;
    url: string;
    poster_path: string;
    release_date: string;
    genres: string[];
    runtime: number | string;
    overview: string;
    vote: number | string;
    vote_average?: number;
    vote_count?: number;
    tagline?: string;
    budget?: number;
    revenue?: number;
}