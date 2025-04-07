import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import SearchForm from './SearchForm.tsx';

describe('SearchForm Component', () => {
  const initQuery = 'react'
  const onSearchMock = jest.fn();

  it('should render an input with the value equal to initial value passed in props', () => {
    const { getByDisplayValue } = render(<SearchForm initQuery={initQuery} onSearch={onSearchMock}/>);

    expect(getByDisplayValue(initQuery)).toBeInTheDocument();
  });

  it('should change input value on typing and call onChange fn on button click', async () => {
    const userInput = 'user query';
    const user = userEvent.setup();

    const { getByTestId } = render(<SearchForm initQuery={initQuery} onSearch={onSearchMock}/>);

    const inputElement = getByTestId('search-form-input');
    const buttonElement = getByTestId('search-form-button');
    expect(inputElement).toHaveValue(initQuery);

    await user.type(inputElement, userInput);

    expect(inputElement).toHaveValue(`${initQuery}${userInput}`);

    await userEvent.click(buttonElement);

    expect(onSearchMock).toHaveBeenCalledWith(`${initQuery}${userInput}`)
  })

  it('should change input value on typing and call onChange fn on press Enter key', async () => {
    const userInput = 'user query';
    const user = userEvent.setup();

    const { getByTestId } = render(<SearchForm initQuery={initQuery} onSearch={onSearchMock}/>);

    const inputElement = getByTestId('search-form-input');

    expect(inputElement).toHaveValue(initQuery);

    await user.type(inputElement, `${userInput}{enter}`);

    expect(inputElement).toHaveValue(`${initQuery}${userInput}`);

    expect(onSearchMock).toHaveBeenCalledWith(`${initQuery}${userInput}`)
  })
})