import { IMovie } from "../models/Movie.ts";

export const moviesMock: IMovie[] = [
    {
        title: 'Reservoir dogs',
        url: '',
        imageUrl: 'https://m.media-amazon.com/images/M/MV5BYjg4MmU3NWYtMWE5ZC00ZmNmLWIyZjItMGU4NmYxMjdmNzQ1XkEyXkFqcGc@._V1_.jpg',
        releaseDate: '1992-01-01',
        relevantGenres: ['Oscar winning Movie'],
        duration: 154,
        description: 'Jules Winnfield (Samuel L. Jackson) and Vincent Vega (John Travolta) are two hit men who are out to retrieve a suitcase stolen from their employer, mob boss Marsellus Wallace (Ving Rhames). Wallace has also asked Vincent to take his wife Mia (Uma Thurman) out a few days later when Wallace himself will be out of town. Butch Coolidge (Bruce Willis) is an aging boxer who is paid by Wallace to lose his fight. The lives of these seemingly unrelated people are woven together comprising of a series of funny, bizarre and uncalled-for incidents.—Soumitra',
        rating: 7.8,
    }
]