import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import Counter from 'src/components/counter/Counter.tsx';

describe('Counter Component', () => {
  const initValue = 5;

  it('should render the initial value provided in props', () => {
    render(<Counter initValue={initValue}/>);

    const countDisplay = screen.getByText(initValue);
    expect(countDisplay).toBeInTheDocument();
  });

  it('should decrement the displayed value when the decrement button is clicked', async () => {
    const { getByTestId } = render(<Counter initValue={initValue}/>);

    const counterValue = getByTestId('counter-value');

    expect(counterValue).toHaveTextContent(`${initValue}`);

    await userEvent.click(getByTestId('counter-btn-decrement'));

    expect(counterValue).toHaveTextContent(`${initValue - 1}`);
  })

  it('should increment the displayed value when the increment button is clicked', async () => {
    const { getByTestId } = render(<Counter initValue={initValue}/>);

    const counterValue = getByTestId('counter-value');

    expect(counterValue).toHaveTextContent(`${initValue}`);

    await userEvent.click(getByTestId('counter-btn-increment'));

    expect(counterValue).toHaveTextContent(`${initValue + 1}`);
  })
})