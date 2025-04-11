import { type FC, type ChangeEvent } from 'react';
import styles from './Select.module.scss';

interface ISelectProps {
    value: string | string[];
    options: string[];
    name: string;
    label?: string;
    placeholder?: string;
    disabled?: boolean;
    required?: boolean;
    error?: string;
    multiple?: boolean;

    onChange: (value: string | string[], key: string) => void;
}

const Select: FC<ISelectProps> = ({
    value,
    options,
    label,
    name,
    placeholder,
    disabled = false,
    required = false,
    multiple = false,
    error,
    onChange,
}) => {

    const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = multiple ? Array.from(event.target.selectedOptions).map(
            (option) => option.value
        ) : event.target.value;

        onChange(selectedValue, event.target.name);
    }

    const renderPlaceholder = () => {
        return multiple ? null : (
            <option value="" disabled hidden>
                {placeholder}
            </option>
        );
    };

    return (
        <div className={styles.select}>
            {label && <label htmlFor={name} className={styles['select__label']}>{ label }</label>}
            <select
                id={name}
                value={value}
                name={name}
                className={styles['select__control']}
                onChange={handleSelectChange}
                multiple={multiple}
                disabled={disabled}
                required={required}
                data-testid="select-control"
            >
                {renderPlaceholder()}
                {options.map((option) => (
                    <option key={option} value={option}>{option}</option>
                ))}
            </select>
            {error && error}
        </div>
    )
};

export default Select;