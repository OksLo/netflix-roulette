import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import Select, { type ISelectProps } from './Select';

const mockProps = {
    name: 'testSelect',
    options: ['Option 1', 'Option 2', 'Option 3'],
    label: 'Test Label',
    placeholder: 'Select an option',
};

describe('Select Component', () => {
    const user = userEvent.setup();

    const validationSchema = Yup.object().shape({
        testSelect: Yup.string().required('This field is required'),
    });

    const renderWithFormik = (
        props: ISelectProps = mockProps,
        initialValues: { testSelect: string | string[] } = { testSelect: '' }
    ) =>
        render(
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={jest.fn()}
            >
                <Form>
                    <Select {...props} />
                </Form>
            </Formik>
        );


    afterEach(() => {
        jest.clearAllMocks();
    });

    test('renders the Select component with label and options', () => {
        renderWithFormik();

        const label = screen.getByText(mockProps.label);
        const selectElement = screen.getByTestId('select-control');

        expect(label).toBeInTheDocument();
        expect(selectElement).toBeInTheDocument();
        mockProps.options.forEach((option) => {
            expect(screen.getByRole('option', { name: option })).toBeInTheDocument();
        });
    });

    test('renders placeholder when `multiple` is false', () => {
        renderWithFormik();

        const placeholderOption = screen.getByText(mockProps.placeholder);
        expect(placeholderOption).toBeInTheDocument();
        expect(placeholderOption).toHaveAttribute('value', '');
    });

    test('does not render placeholder when `multiple` is true', () => {
        renderWithFormik(
            { ...mockProps, multiple: true },
            { testSelect: [''] }
        );

        const placeholderOption = screen.queryByRole('option', {
            name: mockProps.placeholder,
        });
        expect(placeholderOption).not.toBeInTheDocument();
    });

    test('handles value change for single selection', async () => {
        renderWithFormik();

        const selectElement = screen.getByTestId('select-control');
        await user.selectOptions(selectElement, 'Option 2');

        expect(selectElement).toHaveValue('Option 2');
    });

    test('handles value change for multiple selections', async () => {
        renderWithFormik(
            { ...mockProps, multiple: true },
            { testSelect: [''] }
        );

        const selectElement = screen.getByTestId('select-control');
        await user.selectOptions(selectElement, ['Option 1', 'Option 3']);

        const selectedOptions = within(selectElement).getAllByRole('option', {
            selected: true,
        });

        expect(selectedOptions.map((option) => option.value)).toEqual([
            'Option 1',
            'Option 3',
        ]);
    });

    test('disables the select element when `disabled` is true', () => {
        renderWithFormik({ ...mockProps, disabled: true });

        const selectElement = screen.getByTestId('select-control');
        expect(selectElement).toBeDisabled();
    });

    test('displays error message when field has validation error', async () => {
        renderWithFormik();

        const selectElement = screen.getByTestId('select-control');

        await userEvent.click(selectElement);
        await userEvent.tab();

        const errorMessage = await screen.findByText(/this field is required/i);
        expect(errorMessage).toBeInTheDocument();
    });
});
