import { type FC } from 'react';
import styles from './MovieList.module.scss';

import MovieTile from 'src/components/movieTile/MovieTile.tsx';

import { IMovie } from 'src/models/Movie.ts';

interface IMovieListProps {
    movies: IMovie[];
    onMovieSelect: (movie: IMovie) => void
}

const MovieList: FC<IMovieListProps> = ({ movies, onMovieSelect }) => {

    return (
        <ul className={styles['movie-list']}>
            {movies.map((movie, index) => (
                <li key={index}
                    className={styles['movie-list__item']}
                    onClick={() => onMovieSelect(movie)}
                >
                    <MovieTile movie={movie} />
                </li>
            ))}
        </ul>
    )
};

export default MovieList;