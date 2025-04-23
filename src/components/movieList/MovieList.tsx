import { type FC } from 'react';
import { Link } from "react-router-dom";
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
                    <Link to={`/${movie.id}`}><MovieTile movie={movie} /></Link>
                </li>
            ))}
        </ul>
    )
};

export default MovieList;