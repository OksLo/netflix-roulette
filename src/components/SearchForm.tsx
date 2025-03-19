import { type FC, type ChangeEvent, type FormEvent, useState } from 'react';
import styles from './searchform.module.scss';

interface ISearchFormProps {
  initQuery: string;
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
    if (searchQuery) {
      onSearch(searchQuery);
    }
  }

  return (
    <form onSubmit={handleSearchSubmit} className={styles['search-form']}>
      <input
        type="search"
        placeholder={placeholder}
        value={searchQuery}
        onChange={handleInputChange}
        onFocus={handleSearchSubmit}
        className={styles['search-form__input']}
      />
      <button type="submit" className={styles['search-form__btn']}>search</button>
    </form>
  )
};

export default SearchForm;