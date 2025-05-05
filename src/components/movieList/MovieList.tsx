import { type FC } from 'react';
import { useNavigate, useSearchParams } from "react-router-dom";
import styles from './MovieList.module.scss';

import MovieTile from 'src/components/movieTile/MovieTile.tsx';

import { IMovie } from 'src/models/Movie.ts';

interface IMovieListProps {
    movies: IMovie[];
}

const MovieList: FC<IMovieListProps> = ({ movies }) => {
    const [searchParams] = useSearchParams();
    const queryParams = new URLSearchParams(searchParams);

    const navigate = useNavigate();

    const handleMovieTileOpen = (id: number) => {
        navigate(`/${id}?${queryParams}`);
    }

    return (
        <ul className={styles['movie-list']}>
            {movies.map((movie, index) => (
                <li key={index}
                    className={styles['movie-list__item']}
                    data-testid="movie-list-item"
                    onClick={() => handleMovieTileOpen(movie.id!)}
                >
                    <MovieTile movie={movie} />
                </li>
            ))}
        </ul>
    )
};

export default MovieList;
