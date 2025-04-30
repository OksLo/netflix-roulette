import { ISearchParams } from "src/models/Api.ts";
import { IMovie } from "src/models/Movie.ts";
import { MOVIE_API_PATH } from "src/constants/api.ts";

class FetchError extends Error {
    constructor({ status, statusText }) {
        super(statusText);
        this.status = status;
    }
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
        method: "POST",
        body: JSON.stringify(movie),
    });
    if (!response.ok) {
        throw new FetchError(response);
    }
    return await response.json();
}

export const editMovie = async (movie: IMovie) => {
    const response = await fetch(`${MOVIE_API_PATH}`, {
        method: "PUT",
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