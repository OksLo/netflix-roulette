import { ISearchParams } from "src/models/Api.ts";
import { IMovie } from "src/models/Movie.ts";
import { MOVIE_API_PATH } from "src/constants/api.ts";

class FetchError extends Error {
    constructor({ status, statusText }) {
        super(statusText);
        this.status = status;
    }
}

function removeEmptyFieldsImmutable(obj) {
    return Object.entries(obj) // Convert object to an array of [key, value] pairs
        .filter(([key, value]) => {
            // Filter out empty fields
            return !(
                value === null ||
                value === undefined ||
                value === '' ||
                (Array.isArray(value) && value.length === 0) ||
                (typeof value === 'object' && Object.keys(value).length === 0)
            );
        })
        .reduce((acc, [key, value]) => {
            // Convert the filtered array back into an object
            acc[key] = value;
            return acc;
        }, {});
}

export const getMovies =
    async (searchParams: ISearchParams): Promise<IMovie[] | undefined> => {
        const response = await fetch(`${MOVIE_API_PATH}?${new URLSearchParams(searchParams).toString()}`);
        if (!response.ok) {
            throw new FetchError(response);
        }
        const result = await response.json();
        return result.data;
}

export const getMovieById = async (movieId: string): Promise<IMovie | undefined> => {
    const response = await fetch(`${MOVIE_API_PATH}/${movieId}`);
    if (!response.ok) {
        throw new FetchError(response);
    }
    return await response.json();
}

export const addMovie = async (movie: IMovie) => {
    const response = await fetch(`${MOVIE_API_PATH}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(removeEmptyFieldsImmutable(movie)),
    });
    if (!response.ok) {
        throw new FetchError(response);
    }
    return await response.json();
}

export const editMovie = async (movie: IMovie) => {
    const response = await fetch(`${MOVIE_API_PATH}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(movie),
    });
    if (!response.ok) {
        throw new FetchError(response);
    }
    return await response.json();
}

export const deleteMovie = async (movieId: string) => {
    const response = await fetch(`${MOVIE_API_PATH}/${movieId}`, {
        method: "DELETE",
    });
    if (!response.ok) {
        throw new FetchError(response);
    }
    return await response.json();
}
