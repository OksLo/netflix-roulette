import { IMovie } from "../models/Movie.ts";

export const moviesMock: IMovie[] = [
    {
        title: 'Reservoir dogs',
        url: '',
        poster_path: 'https://m.media-amazon.com/images/M/MV5BYjg4MmU3NWYtMWE5ZC00ZmNmLWIyZjItMGU4NmYxMjdmNzQ1XkEyXkFqcGc@._V1_.jpg',
        release_date: '1992-01-01',
        genres: ['Oscar winning Movie'],
        runtime: 154,
        overview: 'Jules Winnfield (Samuel L. Jackson) and Vincent Vega (John Travolta) are two hit men who are out to retrieve a suitcase stolen from their employer, mob boss Marsellus Wallace (Ving Rhames). Wallace has also asked Vincent to take his wife Mia (Uma Thurman) out a few days later when Wallace himself will be out of town. Butch Coolidge (Bruce Willis) is an aging boxer who is paid by Wallace to lose his fight. The lives of these seemingly unrelated people are woven together comprising of a series of funny, bizarre and uncalled-for incidents.—Soumitra',
        vote: 7.6,
        vote_average: 7.8,
        vote_count: 156,
    }
]