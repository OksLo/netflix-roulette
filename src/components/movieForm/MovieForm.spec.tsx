import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import MovieForm from './MovieForm';
import { moviesMock, genresMock } from 'src/mocks';
import { IMovie } from 'src/models/Movie';

jest.mock('src/components/controls/Input.tsx', () => (props: any) => {
    const { label, value, onChange, ...rest } = props;
    return (
        <div>
            <label>
                {label}
                <input {...rest} value={value} data-testid={rest.name} onChange={onChange} />
            </label>
        </div>
    );
});

jest.mock('src/components/controls/Select.tsx', () => (props: any) => {
    const { label, value, onChange, options, ...rest } = props;
    return (
        <div>
            <label>
                {label}
                <select
                    {...rest}
                    value={value}
                    multiple
                    data-testid={rest.name}
                    onChange={(e) =>
                        onChange(
                            Array.from(e.target.selectedOptions).map((option: any) => option.value),
                            rest.name
                        )
                    }
                >
                    {options.map((option: string) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            </label>
        </div>
    );
});

describe('MovieForm Component', () => {
    const mockOnSubmit = jest.fn();
    const mockMovie: IMovie = moviesMock[0];

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders the form with initial movie values', () => {
        render(<MovieForm movie={mockMovie} onSubmit={mockOnSubmit} />);

        expect(screen.getByTestId('title')).toHaveValue(mockMovie.title);
        expect(screen.getByTestId('releaseDate')).toHaveValue(mockMovie.releaseDate);
        expect(screen.getByTestId('url')).toHaveValue(mockMovie.url);
        expect(screen.getByTestId('rating')).toHaveValue(mockMovie.rating);
        expect(screen.getByTestId('duration')).toHaveValue(mockMovie.duration);
        expect(screen.getByTestId('description')).toHaveValue(mockMovie.description);
    });

    it('calls handleMovieChange correctly when the user updates an input', async () => {
        render(<MovieForm movie={mockMovie} onSubmit={mockOnSubmit} />);

        const titleInput = screen.getByTestId('title');
        await userEvent.clear(titleInput);
        await userEvent.type(titleInput, 'The Matrix');

        expect(titleInput).toHaveValue('The Matrix');
    });

    it('updates the genres when the user selects multiple options', async () => {
        render(<MovieForm movie={mockMovie} onSubmit={mockOnSubmit} />);

        const genresSelect = screen.getByTestId('relevantGenres');
        await userEvent.selectOptions(genresSelect, [genresMock[0], genresMock[1]]);

        expect(screen.getByRole('option', { name: genresMock[0] }).selected).toBe(true);
        expect(screen.getByRole('option', { name: genresMock[1] }).selected).toBe(true);
    });

    it('resets the form when the reset button is clicked', async () => {
        render(<MovieForm movie={mockMovie} onSubmit={mockOnSubmit} />);

        const titleInput = screen.getByTestId('title');
        await userEvent.clear(titleInput);
        await userEvent.type(titleInput, 'The Matrix');

        expect(titleInput).toHaveValue('The Matrix');

        await userEvent.click(screen.getByRole('button', { name: /reset/i }));

        expect(titleInput).toHaveValue(mockMovie.title);
    });

    it('calls onSubmit with updated movie data when the form is submitted', async () => {
        render(<MovieForm movie={mockMovie} onSubmit={mockOnSubmit} />);

        const titleInput = screen.getByTestId('title');
        await userEvent.clear(titleInput);
        await userEvent.type(titleInput, 'The Matrix');

        await userEvent.click(screen.getByRole('button', { name: /submit/i }));

        expect(mockOnSubmit).toHaveBeenCalledTimes(1);
        expect(mockOnSubmit).toHaveBeenCalledWith({
            ...mockMovie,
            title: 'The Matrix',
        });
    });

    it('renders all inputs and genres dropdown correctly', () => {
        render(<MovieForm movie={mockMovie} onSubmit={mockOnSubmit} />);

        expect(screen.getByTestId('title')).toBeInTheDocument();
        expect(screen.getByTestId('releaseDate')).toBeInTheDocument();
        expect(screen.getByTestId('url')).toBeInTheDocument();
        expect(screen.getByTestId('rating')).toBeInTheDocument();
        expect(screen.getByTestId('duration')).toBeInTheDocument();
        expect(screen.getByTestId('description')).toBeInTheDocument();

        expect(screen.getByTestId('relevantGenres')).toBeInTheDocument();
    });
});