import { render, screen, fireEvent } from '@testing-library/react';
import MovieDetails from './MovieDetails.tsx';

import { getDurationFromMinutes } from 'src/utils/time';
import { moviesMock } from "src/mocks";

jest.mock('src/utils/time', () => ({
  getDurationFromMinutes: jest.fn(),
}));
jest.mock('src/assets/imagePlaceholder.png', () => 'image-placeholder');

describe('MovieDetails Component', () => {
  const movieMock = moviesMock[0];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render the initial value provided in props', () => {
    const mockDuration = '2h 49m';
    (getDurationFromMinutes as jest.Mock).mockReturnValue(mockDuration);

    render(
        <MovieDetails movie={movieMock}/>
    );

    // Check movie name
    const nameElement = screen.getByText(movieMock.title);
    expect(nameElement).toBeInTheDocument();

    // Check movie image
    const imageElement = screen.getByAltText(movieMock.title);
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute('src', movieMock.poster_path);

    // Check genres
    const genresElement = screen.getByText(movieMock.genres.join(','));
    expect(genresElement).toBeInTheDocument();

    // Check release year
    const releaseDateElement = screen.getByText((new Date(movieMock.release_date)).getFullYear());
    expect(releaseDateElement).toBeInTheDocument();

    // Check duration
    const durationElement = screen.getByText(mockDuration);
    expect(durationElement).toBeInTheDocument();
    expect(getDurationFromMinutes).toHaveBeenCalledWith(movieMock.runtime);

    // Check description
    const descriptionElement = screen.getByText(movieMock.overview);
    expect(descriptionElement).toBeInTheDocument();
  });

  it('should display a placeholder image if the image fails to load', () => {
    render(<MovieDetails movie={ movieMock } />);

    const imageElement = screen.getByAltText(movieMock.title) as HTMLImageElement;

    fireEvent.error(imageElement);

    // Check if the `src` tag was replaced by the placeholder
    expect(imageElement.src).toContain('image-placeholder');
  });
})