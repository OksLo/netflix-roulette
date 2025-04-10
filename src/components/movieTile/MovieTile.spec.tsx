import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import MovieTile from './MovieTile.tsx';

import { moviesMock } from "src/mocks";

describe('MovieTile Component', () => {
  const movieMock = moviesMock[0];

  it('should render the initial value provided in props', () => {
    render(
        <MovieTile movie={movieMock}/>
    );

    // Check movie name
    const nameElement = screen.getByText(movieMock.title);
    expect(nameElement).toBeInTheDocument();

    // Check movie genres
    const genresElement = screen.getByText(movieMock.relevantGenres.join(','));
    expect(genresElement).toBeInTheDocument();

    // Check release year
    const releaseDateElement = screen.getByText((new Date(movieMock.releaseDate)).getFullYear());
    expect(releaseDateElement).toBeInTheDocument();

    // Check movie image
    const imageElement = screen.getByAltText(movieMock.title);
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute('src', movieMock.imageUrl);
  });


  it('should show the menu when the menu button is clicked', async () => {
    render(<MovieTile movie={movieMock} />);

    // Menu is not visible before click
    const menu = screen.queryByTestId('movie-tile-menu');
    expect(menu).not.toBeInTheDocument();

    // Simulate clicking the menu button
    const menuButton = screen.getByTestId('movie-tile-menu-btn',);
    await userEvent.click(menuButton);

    // Menu should now appear
    const openedMenu = screen.getByTestId('movie-tile-menu');
    expect(openedMenu).toBeInTheDocument();
  });
})