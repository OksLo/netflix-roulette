import { type FC } from 'react';
import { Link, useSearchParams } from "react-router-dom";
import styles from './MovieList.module.scss';

import MovieTile from 'src/components/movieTile/MovieTile.tsx';

import { IMovie } from 'src/models/Movie.ts';

interface IMovieListProps {
    movies: IMovie[];
}

const MovieList: FC<IMovieListProps> = ({ movies }) => {
    const [searchParams] = useSearchParams();
    const queryParams = new URLSearchParams(searchParams);

    return (
        <ul className={styles['movie-list']}>
            {movies.map((movie, index) => (
                <li key={index}
                    className={styles['movie-list__item']}
                    data-testid="movie-list-item"
                >
                    <Link to={`/${movie.id}?${queryParams}`}><MovieTile movie={movie} /></Link>
                </li>
            ))}
        </ul>
    )
};

export default MovieList;