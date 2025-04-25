import { getMovies, getMovieById } from './getData.ts';
import { MOVIE_API_PATH } from 'src/constants/api';
import { ISearchParams } from 'src/models/Api';
import { IMovie } from 'src/models/Movie';

import { moviesMock } from "src/mocks";

global.fetch = jest.fn();

const mockFetch = fetch as jest.Mock;

describe('getData utils', () => {
    afterEach(() => {
        jest.clearAllMocks(); // Clear mocks after each test
    });

    describe('getMovies', () => {
        const mockMoviesResponse = {
            data: moviesMock,
        };

        it('fetches movies successfully with search parameters', async () => {
            const mockSearchParams: ISearchParams = { filter: 'action', sortBy: 'rating' };

            // Mock successful fetch response
            mockFetch.mockResolvedValueOnce({
                ok: true,
                json: async () => mockMoviesResponse,
            });

            const result = await getMovies(mockSearchParams);

            expect(fetch).toHaveBeenCalledWith(
                `${MOVIE_API_PATH}?${new URLSearchParams(mockSearchParams).toString()}`
            );
            expect(fetch).toHaveBeenCalledTimes(1);

            expect(result).toEqual(mockMoviesResponse.data);
        });

        it('throws a FetchError when the response status is not ok', async () => {
            const mockSearchParams: ISearchParams = { filter: 'comedy' };

            // Mock failing fetch response
            mockFetch.mockResolvedValueOnce({
                ok: false,
                status: 404,
                statusText: 'Not Found',
            });

            await expect(getMovies(mockSearchParams)).rejects.toThrowError('Not Found');

            expect(fetch).toHaveBeenCalledWith(
                `${MOVIE_API_PATH}?${new URLSearchParams(mockSearchParams).toString()}`
            );
            expect(fetch).toHaveBeenCalledTimes(1);
        });
    });

    // Test for getMovieById
    describe('getMovieById', () => {
        const mockMovieResponse: IMovie = moviesMock[0];

        it('fetches a single movie by ID successfully', async () => {
            const movieId = mockMovieResponse.id;

            // Mock successful fetch response
            mockFetch.mockResolvedValueOnce({
                ok: true,
                json: async () => mockMovieResponse,
            });

            const result = await getMovieById(movieId);

            expect(fetch).toHaveBeenCalledWith(`${MOVIE_API_PATH}/${movieId}`);
            expect(fetch).toHaveBeenCalledTimes(1);

            expect(result).toEqual(mockMovieResponse);
        });

        it('throws a FetchError when the response for getMovieById is not ok', async () => {
            const movieId = '999';

            // Mock failing fetch response
            mockFetch.mockResolvedValueOnce({
                ok: false,
                status: 404,
                statusText: 'Not Found',
            });

            await expect(getMovieById(movieId)).rejects.toThrowError('Not Found');

            expect(fetch).toHaveBeenCalledWith(`${MOVIE_API_PATH}/${movieId}`);
            expect(fetch).toHaveBeenCalledTimes(1);
        });
    });
});