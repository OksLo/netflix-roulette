import { render, screen } from '@testing-library/react';

import MovieDetails from './MovieDetails.tsx';

import { moviesMock } from "src/mocks";

import { getDurationFromMinutes } from 'src/utils/time';

jest.mock('src/utils/time', () => ({
  getDurationFromMinutes: jest.fn(),
}));

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
    const nameElement = screen.getByText(movieMock.name);
    expect(nameElement).toBeInTheDocument();

    // Check movie image
    const imageElement = screen.getByAltText(movieMock.name);
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute('src', movieMock.imageUrl);

    // Check genres
    const genresElement = screen.getByText(movieMock.relevantGenres.join(','));
    expect(genresElement).toBeInTheDocument();

    // Check release year
    const releaseYearElement = screen.getByText(movieMock.releaseYear.toString());
    expect(releaseYearElement).toBeInTheDocument();

    // Check duration
    const durationElement = screen.getByText(mockDuration);
    expect(durationElement).toBeInTheDocument();
    expect(getDurationFromMinutes).toHaveBeenCalledWith(movieMock.duration);

    // Check description
    const descriptionElement = screen.getByText(movieMock.description);
    expect(descriptionElement).toBeInTheDocument();
  });
})