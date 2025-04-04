import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import SortControl from './SortControl.tsx';

import { IOption } from 'src/models/Controls.ts'
import { sortOptionsMock } from "src/mocks";

describe('SortControl Component', () => {
  const onChangeMock = jest.fn();

  it('should render the initial value provided in props', () => {
    render(
        <SortControl options={sortOptionsMock} selectedOption={sortOptionsMock[0].value} onChange={onChangeMock}/>
    );

    // Check if the label exists
    const label = screen.getByText('Sort by');
    expect(label).toBeInTheDocument();

    const select = screen.getByTestId('sort-control-select');

    expect(select).toHaveValue(sortOptionsMock[0].value);

    sortOptionsMock.forEach((option: IOption) => {
      expect(screen.getByText(option.label)).toBeInTheDocument()
    });
  });


  it('should call onChange fn when sort option is changed', async () => {
    render(<SortControl options={sortOptionsMock} selectedOption={sortOptionsMock[0].value} onChange={onChangeMock}/>);

    const select = screen.getByTestId('sort-control-select');

    await userEvent.selectOptions(select, sortOptionsMock[1].value);

    expect(onChangeMock).toHaveBeenCalledWith(sortOptionsMock[1].value);
  })
})