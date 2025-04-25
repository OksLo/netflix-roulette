import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import userEvent from '@testing-library/user-event';
import MovieList from './MovieList';
import { IMovie } from 'src/models/Movie';

import { moviesMock } from "src/mocks";

jest.mock('src/assets/imagePlaceholder.png', () => 'image-placeholder');

describe('MovieList Component', () => {
    const mockMovies: IMovie[] = moviesMock;

    const renderWithRouter = (component: React.ReactNode) => {
        return render(<BrowserRouter>{component}</BrowserRouter>);
    };

    it('renders a list of movies', () => {
        renderWithRouter(<MovieList movies={mockMovies} />);

        expect(screen.getAllByTestId('movie-list-item').length).toBe(mockMovies.length);
        mockMovies.forEach((movie) => {
            expect(screen.getByText(movie.title)).toBeInTheDocument();
        });
    });

    it('renders correctly with links leading to movie detail pages', () => {
        renderWithRouter(<MovieList movies={mockMovies} />);

        mockMovies.forEach((movie) => {
            const linkElement = screen.getByRole('link', { name: new RegExp(movie.title, 'i') });
            expect(linkElement).toBeInTheDocument();
            expect(linkElement).toHaveAttribute('href', `/${movie.id}`);
        });
    });

    it('handles user interactions with links', async () => {
        renderWithRouter(<MovieList movies={mockMovies} />);

        const user = userEvent.setup();

        const firstMovieLink = screen.getByRole('link', { name: new RegExp(mockMovies[0].title, 'i') });

        await user.click(firstMovieLink);

        expect(firstMovieLink).toBeInTheDocument();
        expect(firstMovieLink).toHaveAttribute('href', `/${mockMovies[0].id}`);
    });
});