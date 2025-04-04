import { render } from '@testing-library/react';
import GenreSelector from 'src/components/genreSelector/GenreSelector.tsx';
import userEvent from '@testing-library/user-event';

describe('GenreSelector Component', () => {
  const genresMock = ['Action', 'Drama', 'Comedy', 'Horror'];
  const onSelectMock = jest.fn();

  it('should render the initial value provided in props', () => {
    const { getByText } = render(<GenreSelector genres={genresMock} selected={genresMock[0]} onSelect={onSelectMock}/>);

    genresMock.forEach((genre: string) => {
      expect(getByText(genre)).toBeInTheDocument()
    });
  });

  it('should highlight a selected genre passed in props', () => {
    const { getByText } = render(<GenreSelector genres={genresMock} selected={genresMock[0]} onSelect={onSelectMock}/>);

    const selectedItemElement = getByText(genresMock[0])

    expect(selectedItemElement).toHaveClass('genre-selector__btn_selected')
  })

  it('should call onSelect fn after a click event on a genre button', async () => {
    const { getByText } = render(<GenreSelector genres={genresMock} selected={genresMock[0]} onSelect={onSelectMock}/>);

    const buttonElement = getByText(genresMock[1]);

    await userEvent.click(buttonElement);

    expect(onSelectMock).toHaveBeenCalledWith(genresMock[1]);
  })
})