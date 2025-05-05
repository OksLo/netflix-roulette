import {type FC, type SyntheticEvent, useState} from 'react';
import { useNavigate } from "react-router-dom";
import styles from './MovieTile.module.scss';

import { IMovie } from 'src/models/Movie.ts'
import ImagePlaceholder from "src/assets/imagePlaceholder.png";

interface IMovieTileProps {
    movie: IMovie;
}

const MovieTile: FC<IMovieTileProps> = ({ movie }) => {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleMenuToggle = (e, isOpen: boolean = !isMenuOpen) => {
        e.stopPropagation();
        setIsMenuOpen(isOpen);
    }

    const handleImgError = (event: SyntheticEvent<HTMLImageElement, Event>) => {
        event.target.src = ImagePlaceholder;
    }

    const handleMovieStartEdit = (e) => {
        e.stopPropagation();

        navigate(`/${movie.id}/edit`, { state: { movie } })
    }

    return (
        <div className={styles['movie-tile']}>
            <figure>
                <img
                    src={movie.poster_path}
                    alt={movie.title}
                    className={styles['movie-tile__img']}
                    onError={handleImgError}
                />
                <figcaption className={styles['movie-tile__caption']}>
                    <span className={styles['movie-tile__name']}>{ movie.title }</span>
                    {movie.genres && <span className={styles['movie-tile__genres']}>{movie.genres.join(',')}</span>}
                    <span className={styles['movie-tile__year']}>{(new Date(movie.release_date)).getFullYear()}</span>
                </figcaption>
            </figure>
            <div className={styles['movie-tile__actions']}>
                <button
                    className={styles['movie-tile__actions-btn']}
                    onClick={(e) => handleMenuToggle(e, true)}
                    data-testid="movie-tile-menu-btn"
                >⋮</button>
                {isMenuOpen && <menu className={styles['movie-tile__actions-menu']} data-testid="movie-tile-menu">
                    <li onClick={(e) => handleMenuToggle(e, false)}>✕</li>
                    <li onClick={handleMovieStartEdit}>Edit</li>
                    <li>Delete</li>
                </menu>}
            </div>
        </div>

    )
};

export default MovieTile;
