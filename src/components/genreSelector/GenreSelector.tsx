import { type FC, useState } from 'react';
import styles from './GenreSelector.module.scss';

interface IGenreSelectorProps {
  genres: string[];
  selected?: string;
  onSelect: (genre: string) => void;
}

const GenreSelector: FC<IGenreSelectorProps> = ({ genres, selected, onSelect }) => {

  const [selectedGenre, setSelectedGenre] = useState<string>(selected || genres[0]);

  const handleGenreChange = (newGenreName: string) => {
    if (newGenreName) {
      setSelectedGenre(newGenreName);
      onSelect(newGenreName)
    }
  }

  const getClassName = (genreName: string): string => {
    return genreName === selectedGenre ? styles['genre-selector__btn_selected'] : '';
  }

  return (
    <ul className={styles['genre-selector']}>
      {genres.map((genreName, index) => (
        <li
          key={index}
        >
          <button
            onClick={() => handleGenreChange(genreName)}
            className={`${styles['genre-selector__btn']} ${getClassName(genreName)}`}
          >
            { genreName }
          </button>
        </li>
      ))}
    </ul>
  )
};

export default GenreSelector;