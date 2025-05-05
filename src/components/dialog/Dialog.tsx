import { type FC, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from "react-router-dom";
import styles from './Dialog.module.scss';


interface IDialogProps {
    onClose?: () => void;
    children: ReactNode;
    title: string | ReactNode;
}

const Dialog: FC<IDialogProps> = ({ onClose, children, title }) => {
    const navigate = useNavigate();

    const handleCloseDialog = () => {
        if (onClose) {
            onClose();
        }
        navigate('/');
    }

    return (
        <>
            {createPortal(
                <dialog open className={styles.dialog}>
                    <div className={styles['dialog__window']}>
                        <button
                            onClick={handleCloseDialog}
                            className={styles['dialog__btn-close']}
                        >✕</button>
                        <h2 className={styles['dialog__title']}>{title}</h2>
                        <div className={styles['dialog__content']}>
                            { children }
                        </div>
                    </div>
                </dialog>,
                document.body
            )}
        </>
    )
};

export default Dialog;