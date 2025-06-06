import { type FC, type ChangeEvent, type FormEvent, useState } from 'react';
import { Outlet } from "react-router-dom";
import styles from './SearchForm.module.scss';

interface ISearchFormProps {
  initQuery?: string;
  onSearch: (query: string) => void;
}

const SearchForm: FC<ISearchFormProps> = ({ initQuery = '', onSearch }) => {

  const placeholder = 'What do you want to watch?'

  const [searchQuery, setSearchQuery] = useState<string>(initQuery);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value)
  }

  const handleSearchSubmit = (event: FormEvent<HTMLFormElement|HTMLInputElement>) => {
    event.preventDefault();
    onSearch(searchQuery);
  }

  return (
    <>
        <form onSubmit={handleSearchSubmit} className={styles['search-form']}>
            <legend className={styles['search-form__legend']}>Find your movie</legend>
            <input
                type="search"
                placeholder={placeholder}
                value={searchQuery}
                onChange={handleInputChange}
                onFocus={handleSearchSubmit}
                className={styles['search-form__input']}
                data-testid="search-form-input"
            />
            <button
                type="submit"
                className={styles['search-form__btn']}
                data-testid="search-form-button"
            >
                search
            </button>
        </form>
        <Outlet />
    </>
  )
};

export default SearchForm;