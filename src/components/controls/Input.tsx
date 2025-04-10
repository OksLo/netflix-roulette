import { type FC, type ChangeEvent } from 'react';
import styles from './Input.module.scss';


interface IInputProps {
    value: string | number;
    name: string;
    label?: string;
    type?: 'text' | 'email' | 'password' | 'number' | 'date' | 'url' | 'textarea'
    placeholder?: string;
    disabled?: boolean;
    required?: boolean;
    error?: string;

    onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const Input: FC<IInputProps> = ({
    value,
    name,
    label,
    type = 'text',
    placeholder,
    disabled = false,
    required = false,
    error,
    onChange,
}) => {

    return (
        <div className={styles.input}>
            {label && <label htmlFor={name} className={styles['input__label']}>{ label }</label>}
            {type !== 'textarea' && <input
                id={name}
                name={name}
                type={type}
                value={value}
                placeholder={placeholder}
                disabled={disabled}
                required={required}
                className={`${styles['input__control']} ${error ? styles['input-error'] : ''}`}
                onChange={onChange}
            />}
            {type === 'textarea' && <textarea
                value={value}
                id={name}
                name={name}
                placeholder={placeholder}
                disabled={disabled}
                required={required}
                className={`${styles['input__control']} ${error ? styles['input-error'] : ''}`}
                onChange={onChange}
            ></textarea>}
            {error && error}
        </div>
    )
};

export default Input;