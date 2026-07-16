import { ISearchParams } from "src/models/Api.ts";
import { IMovie } from "src/models/Movie.ts";
import { MOVIE_API_PATH } from "src/constants/api.ts";

class FetchError extends Error {
    status: number;
    constructor({ status, statusText }: { status: number; statusText: string }) {
        super(statusText);
        this.status = status;
    }
}

function removeEmptyFieldsImmutable(obj: Record<string, unknown>): Record<string, unknown> {
    return Object.entries(obj)
        .filter(([, value]) => {
            return !(
                value === null ||
                value === undefined ||
                value === '' ||
                (Array.isArray(value) && value.length === 0) ||
                (typeof value === 'object' && Object.keys(value as object).length === 0)
            );
        })
        .reduce((acc: Record<string, unknown>, [key, value]) => {
            acc[key] = value;
            return acc;
        }, {});
}

export const getMovies =
    async (searchParams: ISearchParams): Promise<IMovie[] | undefined> => {
        try {
            const response = await fetch(`${MOVIE_API_PATH}?${new URLSearchParams(searchParams as Record<string, string>).toString()}`);
            if (!response.ok) {
                throw new FetchError(response);
            }
            const result = await response.json();
            return result.data;
        } catch (e) {
            throw new Error("Failed to fetch resource", { cause: e });
        }
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
        body: JSON.stringify(removeEmptyFieldsImmutable(movie as unknown as Record<string, unknown>)),
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
