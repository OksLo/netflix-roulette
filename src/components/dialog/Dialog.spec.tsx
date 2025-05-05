import { render, screen } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import Dialog from './Dialog';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
}));

describe('Dialog Component', () => {
    const user = userEvent.setup();
    const onCloseMock = jest.fn();
    const navigateMock = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
        (useNavigate as jest.Mock).mockReturnValue(navigateMock);
    });

    it('renders the dialog with title and children', () => {
        render(
            <Dialog onClose={onCloseMock} title="Dialog Title">
                <p>This is the dialog content.</p>
            </Dialog>
        );

        expect(screen.getByText('Dialog Title')).toBeInTheDocument();
        expect(screen.getByText('This is the dialog content.')).toBeInTheDocument();
    });

    it('renders the close button', () => {
        render(
            <Dialog onClose={onCloseMock} title="Dialog Title">
                <p>Dialog Content</p>
            </Dialog>
        );

        const closeButton = screen.getByRole('button', { name: /✕/i });
        expect(closeButton).toBeInTheDocument();
    });

    it('calls onClose and navigates to "/" when the close button is clicked', async () => {
        render(
            <Dialog onClose={onCloseMock} title="Dialog Title">
                <p>Dialog Content</p>
            </Dialog>
        );

        const closeButton = screen.getByRole('button', { name: /✕/i });
        await user.click(closeButton);

        expect(onCloseMock).toHaveBeenCalledTimes(1);
        expect(navigateMock).toHaveBeenCalledWith('/');
    });

    it('renders the dialog as a portal to document.body', () => {
        render(
            <Dialog onClose={onCloseMock} title="Dialog Title">
                <p>Dialog Content</p>
            </Dialog>
        );

        const dialogElement = screen.getByRole('dialog');
        expect(dialogElement.parentElement).toEqual(document.body);
    });

    it('renders a custom ReactNode as the dialog title', () => {
        render(
            <Dialog onClose={onCloseMock} title={<span>Custom Title</span>}>
                <p>Dialog Content</p>
            </Dialog>
        );

        const customTitleElement = screen.getByText('Custom Title');
        expect(customTitleElement).toBeInTheDocument();
    });

    it('renders children as content inside the dialog', () => {
        render(
            <Dialog onClose={onCloseMock} title="Dialog Title">
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
            <Dialog onClose={onCloseMock} title="Dialog Title">
                <p>Dialog Content</p>
            </Dialog>
        );

        const dialogElement = screen.getByRole('dialog');
        expect(dialogElement).toBeInTheDocument();
    });
});
