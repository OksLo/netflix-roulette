import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useField } from 'formik';

import Input, { type IInputProps } from './Input';

jest.mock('formik', () => ({
    ...jest.requireActual('react-router-dom'),
    useField: jest.fn(),
}));

describe('Input Component', () => {
    const onChangeMock = jest.fn();
    const onBlurMock = jest.fn();

    const useFieldMock = jest.fn();

    const inputProps = {
        name: 'test',
    }

    const renderInput = (
        props: IInputProps = inputProps,
        formikData= { touched: false, error: undefined }
    ) => {
        useFieldMock.mockReturnValue([
            { name: inputProps.name, value: '', onChange: onChangeMock, onBlur: onBlurMock },
            formikData,
        ]);
        (useField as jest.Mock).mockImplementation(useFieldMock);

        return render(
            <Input
                name={props.name}
                label={props.label}
                placeholder={props.placeholder}
                required={props.required}
                disabled={props.disabled}
                type={props.type}
            />
        );
    }

    beforeEach(() => {
        jest.clearAllMocks();
    });


    it('renders an input element with default props', () => {
        renderInput();

        const inputElement = screen.getByRole('textbox');
        expect(inputElement).toBeInTheDocument();
        expect(inputElement).toHaveValue('');
        expect(inputElement).not.toBeDisabled();
        expect(inputElement).toHaveAttribute('type', 'text');

        expect(screen.queryByRole('label')).not.toBeInTheDocument();
    });

    it('renders the label when label prop is provided', () => {
        renderInput({ ...inputProps, label: 'Username' });

        const labelElement = screen.getByLabelText('Username');
        expect(labelElement).toBeInTheDocument();
        expect(labelElement).toHaveAttribute('id', 'test');
    });

    it('renders a textarea when type="textarea"', () => {
        renderInput({ ...inputProps, type: 'textarea' });

        const textareaElement = screen.getByRole('textbox');
        expect(textareaElement).toBeInTheDocument();
        expect(textareaElement.tagName).toBe('TEXTAREA');
    });

    test('displays error message when field has validation error', async () => {
        renderInput(inputProps, { touched: true, error: 'This field is required' });

        const error = screen.getByText('This field is required');
        expect(error).toBeInTheDocument();

        const input = screen.getByTestId('input-control');
        expect(input).toHaveClass('input_invalid');
    });

    test('calls onChange and updates internal value', async () => {
        renderInput();

        const inputElement = screen.getByTestId('input-control');
        expect(inputElement).toHaveValue('');

        await userEvent.type(inputElement, 'Hello, world!');

        expect(onChangeMock).toHaveBeenCalledTimes(13);
    });

    test('calls onBlur when input is blurred', async () => {
        renderInput();

        const input = screen.getByTestId('input-control');

        await userEvent.click(input);
        await userEvent.tab();

        expect(onBlurMock).toHaveBeenCalledTimes(1);
    });

    it('renders a disabled input when the disabled prop is true', () => {
        renderInput({ ...inputProps, disabled: true });

        const inputElement = screen.getByTestId('input-control');
        expect(inputElement).toBeDisabled();
    });

    it('applies the required attribute when required prop is true', () => {
        renderInput({ ...inputProps, required: true });

        const inputElement = screen.getByTestId('input-control');
        expect(inputElement).toBeRequired();
    });

    it('renders input with the correct placeholder', () => {
        renderInput({ ...inputProps, placeholder: "Enter your name" });

        const inputElement = screen.getByPlaceholderText('Enter your name');
        expect(inputElement).toBeInTheDocument();
    });
});
