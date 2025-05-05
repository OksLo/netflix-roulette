import { render, screen } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

import MovieForm from './MovieForm';
import { moviesMock, genresMock } from 'src/mocks';
import { IMovie } from 'src/models/Movie';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
}));

describe('MovieForm Component', () => {
    const mockMovie: IMovie = moviesMock[0];
    const onSubmitMock = jest.fn();
    const navigateMock = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
        (useNavigate as jest.Mock).mockReturnValue(navigateMock);
    });

    it('renders the form with initial movie values', () => {
        render(<MovieForm movie={mockMovie} onSubmit={onSubmitMock} />);

        expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/release date/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/poster path/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/rating/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/runtime/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/overview/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/genre/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
    });

    it('calls handleMovieChange correctly when the user updates an input', async () => {
        render(<MovieForm movie={mockMovie} onSubmit={onSubmitMock} />);

        const titleInput = screen.getByLabelText(/title/i);
        await userEvent.clear(titleInput);
        await userEvent.type(titleInput, 'The Matrix');

        expect(titleInput).toHaveValue('The Matrix');
    });

    it('updates the genres when the user selects multiple options', async () => {
        render(<MovieForm movie={mockMovie} onSubmit={onSubmitMock} />);

        const genresSelect = screen.getByLabelText(/genre/i);
        await userEvent.selectOptions(genresSelect, [genresMock[0], genresMock[1]]);

        expect(screen.getByRole('option', { name: genresMock[0] }).selected).toBe(true);
        expect(screen.getByRole('option', { name: genresMock[1] }).selected).toBe(true);
    });

    it('resets the form when the reset button is clicked', async () => {
        render(<MovieForm movie={mockMovie} onSubmit={onSubmitMock} />);

        const titleInput = screen.getByLabelText(/title/i);
        await userEvent.clear(titleInput);
        await userEvent.type(titleInput, 'The Matrix');

        expect(titleInput).toHaveValue('The Matrix');

        await userEvent.click(screen.getByRole('button', { name: /reset/i }));

        expect(titleInput).toHaveValue(mockMovie.title);
    });
});
