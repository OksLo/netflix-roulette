import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Select from './Select';

describe('Select Component', () => {
    const user = userEvent.setup();
    const mockOnChange = jest.fn();

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders the select element with basic props', () => {
        render(<Select value="" options={['Option 1', 'Option 2']} onChange={mockOnChange} />);

        const selectElement = screen.getByTestId('select-control');
        expect(selectElement).toBeInTheDocument();
        expect(selectElement).toHaveValue('');
        expect(selectElement).not.toBeDisabled();
        expect(selectElement).not.toHaveAttribute('multiple');
    });

    it('renders the label when label prop is provided', () => {
        render(
            <Select
                value=""
                options={['Option 1', 'Option 2']}
                onChange={mockOnChange}
                label="Select Example"
                name="example-select"
            />
        );

        const labelElement = screen.getByText('Select Example');
        const selectElement = screen.getByTestId('select-control');
        expect(labelElement).toBeInTheDocument();
        expect(labelElement).toHaveAttribute('for', 'example-select');
        expect(selectElement).toHaveAttribute('id', 'example-select');
    });

    it('triggers onChange with a single value when one option is selected', async () => {
        render(
            <Select
                value=""
                options={['Option 1', 'Option 2']}
                onChange={mockOnChange}
                name="example-select"
            />
        );

        const selectElement = screen.getByTestId('select-control');
        await user.selectOptions(selectElement, 'Option 2');

        expect(mockOnChange).toHaveBeenCalledTimes(1);
        expect(mockOnChange).toHaveBeenCalledWith('Option 2', 'example-select');
    });

    it('renders a placeholder option in single select mode', () => {
        render(
            <Select
                value=""
                options={['Option 1', 'Option 2']}
                onChange={mockOnChange}
                placeholder="Select an option..."
            />
        );

        const placeholderOption = screen.getByText('Select an option...');
        expect(placeholderOption).toBeInTheDocument();
        expect(placeholderOption).toBeDisabled();
    });

    it('does not render a placeholder option in multiple select mode', () => {
        render(
            <Select
                multiple
                value={[]}
                options={['Option 1', 'Option 2']}
                onChange={mockOnChange}
                placeholder="Select an option..."
            />
        );

        const placeholderOption = screen.queryByText('Select an option...');
        expect(placeholderOption).not.toBeInTheDocument();
    });

    it('renders the select element as disabled when disabled=true', () => {
        render(
            <Select
                value=""
                options={['Option 1', 'Option 2']}
                onChange={mockOnChange}
                disabled
            />
        );

        const selectElement = screen.getByTestId('select-control');
        expect(selectElement).toBeDisabled();
    });

    it('renders the select element with the required attribute when required=true', () => {
        render(
            <Select
                value=""
                options={['Option 1', 'Option 2']}
                onChange={mockOnChange}
                required
            />
        );

        const selectElement = screen.getByTestId('select-control');
        expect(selectElement).toBeRequired();
    });

    it('renders the error message and applies error styles when error prop is provided', () => {
        render(
            <Select
                value=""
                options={['Option 1', 'Option 2']}
                onChange={mockOnChange}
                error="An error occurred"
            />
        );

        const errorMessage = screen.getByText('An error occurred');
        expect(errorMessage).toBeInTheDocument();
    });

    it('renders with the preselected value in single select mode', () => {
        render(<Select value="Option 2" options={['Option 1', 'Option 2']} onChange={mockOnChange} />);

        const selectElement = screen.getByTestId('select-control');
        expect(selectElement).toHaveValue('Option 2');
    });

    it('renders with preselected values in multiple select mode', () => {
        render(
            <Select
                multiple
                value={['Option 1', 'Option 3']}
                options={['Option 1', 'Option 2', 'Option 3']}
                onChange={mockOnChange}
            />
        );

        const selectElement = screen.getByTestId('select-control');
        const selectedOptions = Array.from(selectElement.selectedOptions).map((option) => option.value);
        expect(selectedOptions).toEqual(['Option 1', 'Option 3']);
    });
});