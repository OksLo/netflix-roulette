import { type FC, type ChangeEvent } from 'react';
import { useField } from 'formik';
import styles from './Select.module.scss';

export interface ISelectProps {
    name: string;
    options: string[];
    label?: string;
    placeholder?: string;
    disabled?: boolean;
    required?: boolean;
    multiple?: boolean;
}

const Select: FC<ISelectProps> = ({
    options,
    label,
    placeholder,
    disabled = false,
    required = false,
    multiple = false,
    ...props
}) => {
    const [field, meta, helpers] = useField<string | string[]>(props);

    const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = multiple
            ? Array.from(event.target.selectedOptions, (option) => option.value)
            : event.target.value;

        helpers.setValue(selectedValue);
    }

    const renderPlaceholder = () => {
        return multiple ? null : (
            <option value="" disabled hidden={true}>
                {placeholder}
            </option>
        );
    };

    return (
        <div className={styles.select}>
            {label && <label htmlFor={props.name} className={styles['select__label']}>{ label }</label>}
            <select
                {...field}
                {...props}
                id={props.name}
                value={field.value}
                className={`${styles['select__control']} ${meta.touched && meta.error ? styles['input_invalid'] : ''}`}
                multiple={multiple}
                disabled={disabled}
                required={required}
                data-testid="select-control"
                onChange={handleSelectChange}
            >
                {renderPlaceholder()}
                {options.map((option) => (
                    <option key={option} value={option}>{option}</option>
                ))}
            </select>
            {meta.touched && meta.error ? (
                <div className={styles['select__error']}>{meta.error}</div>
            ) : null}
        </div>
    )
};

export default Select;
