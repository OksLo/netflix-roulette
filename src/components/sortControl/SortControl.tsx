import { type FC, type ChangeEvent } from 'react';
import styles from './SortControl.module.scss';

import { IOption } from 'src/models/Controls.ts'

interface ISortControlProps {
    options: IOption[];
    selectedOption: string;
    onChange: (selected: string) => void;
}

const SortControl: FC<ISortControlProps> = ({ options, selectedOption, onChange }) => {

    const handleSortOptionChange = (event: ChangeEvent<HTMLSelectElement>) => {
      onChange(event.target.value)
    }
    return (
        <div className={styles['sort-control']}>
            <label htmlFor="sort-control" className={styles['sort-control__label']}>Sort by</label>
            <select
                id="sort-control"
                value={selectedOption}
                className={styles['sort-control__select']}
                onChange={handleSortOptionChange}
                data-testid="sort-control-select"
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                ))}
            </select>
        </div>
    )
};

export default SortControl;