import { useNavigate, useSearchParams } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import MovieList from './MovieList';
import { IMovie } from 'src/models/Movie';

import { moviesMock } from "src/mocks";

jest.mock(
    'src/components/movieTile/MovieTile',
    () => jest.fn(() => <div data-testid="movie-tile">Movie Tile</div>)
);

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
    useSearchParams: jest.fn(),
}));

describe('MovieList Component', () => {
    const mockMovies: IMovie[] = moviesMock;

    const navigateMock = jest.fn();
    const searchParams = 'sort=desc';

    beforeEach(() => {
        jest.clearAllMocks();

        (useNavigate as jest.Mock).mockReturnValue(navigateMock);
        (useSearchParams as jest.Mock).mockReturnValue([new URLSearchParams(searchParams), jest.fn()]);
    });

    it('renders the correct number of movies', () => {
        render(<MovieList movies={mockMovies} />);

        expect(screen.getAllByTestId('movie-list-item').length).toBe(mockMovies.length);
    });

    test('renders MovieTile for each movie', () => {
        render(<MovieList movies={mockMovies} />);

        const movieTiles = screen.getAllByTestId('movie-tile');
        expect(movieTiles).toHaveLength(mockMovies.length);
    });

    test('navigates to correct URL when a movie is clicked', async () => {
        render(<MovieList movies={mockMovies} />);

        const movieListItems = screen.getAllByTestId('movie-list-item');

        await userEvent.click(movieListItems[0]);

        expect(navigateMock).toHaveBeenCalledWith(`/${mockMovies[0].id}?${searchParams}`);
    });
});

