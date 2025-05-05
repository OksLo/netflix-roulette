import { type FC } from 'react';
import { useField } from 'formik';
import styles from './Input.module.scss';

export interface IInputProps {
    name: string;
    label?: string;
    type?: 'text' | 'email' | 'password' | 'number' | 'date' | 'url' | 'textarea'
    placeholder?: string;
    disabled?: boolean;
    required?: boolean;
}

const Input: FC<IInputProps> = ({
    label,
    type = 'text',
    placeholder,
    disabled = false,
    required = false,
    ...props
}) => {
    const [field, meta] = useField(props);

    return (
        <div className={styles.input}>
            {label && <label htmlFor={props.name} className={styles['input__label']}>{ label }</label>}
            {type !== 'textarea' && <input
                id={props.name}
                type={type}
                placeholder={placeholder}
                disabled={disabled}
                required={required}
                className={`${styles['input__control']} ${meta.touched && meta.error ? styles['input_invalid'] : ''}`}
                {...field} {...props}
                data-testid="input-control"
            />}
            {type === 'textarea' && <textarea
                id={props.name}
                placeholder={placeholder}
                disabled={disabled}
                required={required}
                className={`${styles['input__control']} ${meta.touched && meta.error ? styles['input_invalid'] : ''}`}
                {...field} {...props}
            ></textarea>}
            {meta.touched && meta.error ? (
                <div className={styles['input__error']} data-testid="input-error">{meta.error}</div>
            ) : null}
        </div>
    )
};

export default Input;
