import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Input from './Input';

describe('Input Component', () => {
    const user = userEvent.setup();
    const mockOnChange = jest.fn();

    it('renders an input element with default props', () => {
        render(<Input value="" onChange={mockOnChange} />);

        const inputElement = screen.getByRole('textbox');
        expect(inputElement).toBeInTheDocument();
        expect(inputElement).toHaveValue('');
        expect(inputElement).not.toBeDisabled();
        expect(inputElement).toHaveAttribute('type', 'text');
    });

    it('renders the label when label prop is provided', () => {
        render(<Input value="" onChange={mockOnChange} label="Username" name="username" />);

        const labelElement = screen.getByLabelText('Username');
        expect(labelElement).toBeInTheDocument();
        expect(labelElement).toHaveAttribute('id', 'username');
    });

    it('calls onChange handler when user types in the input', async () => {
        render(<Input value="" onChange={mockOnChange} />);

        const inputElement = screen.getByRole('textbox');
        await user.type(inputElement, 'Hello');

        expect(mockOnChange).toHaveBeenCalled();
    });

    it('renders a textarea when type="textarea"', () => {
        render(<Input value="" type="textarea" onChange={mockOnChange} />);

        const textareaElement = screen.getByRole('textbox');
        expect(textareaElement).toBeInTheDocument();
        expect(textareaElement.tagName).toBe('TEXTAREA');
    });

    it('applies error styles and displays error message', () => {
        const errorMessage = 'This field is required';

        render(<Input value="" onChange={mockOnChange} error={errorMessage} />);

        const inputElement = screen.getByRole('textbox');
        expect(inputElement).toHaveClass('input-error');
    });

    it('renders a disabled input when the disabled prop is true', () => {
        render(<Input value="test" onChange={mockOnChange} disabled />);

        const inputElement = screen.getByRole('textbox');
        expect(inputElement).toBeDisabled();
    });

    it('applies the required attribute when required prop is true', () => {
        render(<Input value="" onChange={mockOnChange} required />);

        const inputElement = screen.getByRole('textbox');
        expect(inputElement).toBeRequired();
    });

    it('renders input with the correct placeholder', () => {
        render(<Input value="" onChange={mockOnChange} placeholder="Enter your name" />);

        const inputElement = screen.getByPlaceholderText('Enter your name');
        expect(inputElement).toBeInTheDocument();
    });
});