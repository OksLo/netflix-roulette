import {fireEvent, render, screen} from '@testing-library/react';
import { useNavigate } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

import MovieTile from './MovieTile.tsx';

import { moviesMock } from "src/mocks";

jest.mock('src/assets/imagePlaceholder.png', () => 'image-placeholder');

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('MovieTile Component', () => {
  const movieMock = moviesMock[0];

  const navigateMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useNavigate as jest.Mock).mockReturnValue(navigateMock);
  });

  it('should render the initial value provided in props', () => {
    render(
        <MovieTile movie={movieMock}/>
    );

    expect(screen.getByText(movieMock.title)).toBeInTheDocument();
    expect(screen.getByText(movieMock.genres.join(','))).toBeInTheDocument();
    expect(screen.getByText((new Date(movieMock.release_date)).getFullYear())).toBeInTheDocument();

    const imageElement = screen.getByAltText(movieMock.title);
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute('src', movieMock.poster_path);
  });


  it('should show the menu when the menu button is clicked', async () => {
    render(<MovieTile movie={movieMock} />);

    expect(screen.queryByTestId('movie-tile-menu')).not.toBeInTheDocument();

    const menuButton = screen.getByTestId('movie-tile-menu-btn',);
    await userEvent.click(menuButton);

    const openedMenu = screen.getByTestId('movie-tile-menu');
    expect(openedMenu).toBeInTheDocument();
  });

  it('should display a placeholder image if the image fails to load', () => {
    render(<MovieTile movie={ movieMock } />);

    const imageElement = screen.getByAltText(movieMock.title) as HTMLImageElement;

    fireEvent.error(imageElement);

    expect(imageElement.src).toContain('image-placeholder');
  });

  test('navigates to edit page with correct state when "Edit" is clicked', async () => {
    render(<MovieTile movie={movieMock} />);

    const menuButton = screen.getByTestId('movie-tile-menu-btn');
    await userEvent.click(menuButton);

    const editButton = screen.getByText('Edit');
    await userEvent.click(editButton);

    expect(navigateMock).toHaveBeenCalledWith(`/${movieMock.id}/edit`, { state: { movie: movieMock } });
  });
})
