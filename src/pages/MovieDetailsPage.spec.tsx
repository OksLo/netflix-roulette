import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import MovieDetailsPage from './MovieDetailsPage';
import * as reactRouterDom from 'react-router-dom'; // To mock react-router-dom hooks

import { moviesMock } from "src/mocks";

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useLoaderData: jest.fn(),
    useSearchParams: jest.fn(),
}));

jest.mock('src/components/movieDetails/MovieDetails.tsx', () => ({
    __esModule: true,
    default: jest.fn(({ movie }) => <div data-testid="movie-details">{movie.title}</div>),
}));

jest.mock('src/components/icons/SearchIcon.tsx', () => ({
    __esModule: true,
    default: () => <div data-testid="search-icon">🔍</div>,
}));

describe('MovieDetailsPage', () => {
    const mockedUseLoaderData = jest.spyOn(reactRouterDom, 'useLoaderData');
    const mockedUseSearchParams = jest.spyOn(reactRouterDom, 'useSearchParams');

    const mockMovie = moviesMock[0];
    const searchParams = 'filter=action&sortBy=rating';

    beforeEach(() => {
        mockedUseSearchParams.mockReturnValue([new URLSearchParams(searchParams)]);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders the MovieDetails component when movie data is available', () => {
        mockedUseLoaderData.mockReturnValue(mockMovie);

        render(
            <BrowserRouter>
                <MovieDetailsPage />
            </BrowserRouter>
        );

        expect(screen.getByTestId('movie-details')).toHaveTextContent(mockMovie.title);

        expect(screen.getByTestId('search-icon')).toBeInTheDocument();

        const backToSearchLink = screen.getByRole('link');
        expect(backToSearchLink).toHaveAttribute('href', `/?${searchParams}`);
    });

    it('renders nothing when movie data is unavailable', () => {
        mockedUseLoaderData.mockReturnValue(undefined); // No movie data

        render(
            <BrowserRouter>
                <MovieDetailsPage />
            </BrowserRouter>
        );

        expect(screen.queryByTestId('movie-details')).not.toBeInTheDocument();

        expect(screen.getByTestId('search-icon')).toBeInTheDocument();
        const backToSearchLink = screen.getByRole('link');
        expect(backToSearchLink).toHaveAttribute('href', `/?${searchParams}`);
    });

    it('handles user clicking the search icon link', async () => {
        const user = userEvent.setup();
        mockedUseLoaderData.mockReturnValue(mockMovie);

        render(
            <BrowserRouter>
                <MovieDetailsPage />
            </BrowserRouter>
        );

        const backToSearchLink = screen.getByRole('link');
        expect(backToSearchLink).toHaveAttribute('href', `/?${searchParams}`);

        await user.click(backToSearchLink);

        expect(backToSearchLink).toBeInTheDocument();
    });
});