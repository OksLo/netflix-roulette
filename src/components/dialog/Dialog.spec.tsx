import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Dialog from './Dialog';

describe('Dialog Component', () => {
    const user = userEvent.setup();
    const mockOnClose = jest.fn();

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders the dialog with title and children', () => {
        render(
            <Dialog onClose={mockOnClose} title="Dialog Title">
                <p>This is the dialog content.</p>
            </Dialog>
        );

        const titleElement = screen.getByText('Dialog Title');
        expect(titleElement).toBeInTheDocument();

        const contentElement = screen.getByText('This is the dialog content.');
        expect(contentElement).toBeInTheDocument();
    });

    it('renders the close button', () => {
        render(
            <Dialog onClose={mockOnClose} title="Dialog Title">
                <p>Dialog Content</p>
            </Dialog>
        );

        const closeButton = screen.getByRole('button', { name: /✕/i });
        expect(closeButton).toBeInTheDocument();
    });

    it('calls the onClose handler when the close button is clicked', async () => {
        render(
            <Dialog onClose={mockOnClose} title="Dialog Title">
                <p>Dialog Content</p>
            </Dialog>
        );

        const closeButton = screen.getByRole('button', { name: /✕/i });
        await user.click(closeButton);

        expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it('renders the dialog as a portal to document.body', () => {
        render(
            <Dialog onClose={mockOnClose} title="Dialog Title">
                <p>Dialog Content</p>
            </Dialog>
        );

        const dialogElement = screen.getByRole('dialog');
        expect(dialogElement.parentElement).toEqual(document.body);
    });

    it('renders a custom ReactNode as the dialog title', () => {
        render(
            <Dialog onClose={mockOnClose} title={<span>Custom Title</span>}>
                <p>Dialog Content</p>
            </Dialog>
        );

        const customTitleElement = screen.getByText('Custom Title');
        expect(customTitleElement).toBeInTheDocument();
    });

    it('renders children as content inside the dialog', () => {
        render(
            <Dialog onClose={mockOnClose} title="Dialog Title">
                <div>
                    <p>Child Content</p>
                    <button>Click Me</button>
                </div>
            </Dialog>
        );

        const childContent = screen.getByText('Child Content');
        const childButton = screen.getByRole('button', { name: /Click Me/i });

        expect(childContent).toBeInTheDocument();
        expect(childButton).toBeInTheDocument();
    });

    it('renders the dialog with a role="dialog"', () => {
        render(
            <Dialog onClose={mockOnClose} title="Dialog Title">
                <p>Dialog Content</p>
            </Dialog>
        );

        const dialogElement = screen.getByRole('dialog');
        expect(dialogElement).toBeInTheDocument();
    });
});