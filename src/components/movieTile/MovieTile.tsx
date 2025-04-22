import {type FC, type SyntheticEvent, useState} from 'react';
import styles from './MovieTile.module.scss';

import { IMovie } from 'src/models/Movie.ts'
import ImagePlaceholder from "src/assets/imagePlaceholder.png";

interface IMovieTileProps {
    movie: IMovie;
}

const MovieTile: FC<IMovieTileProps> = ({ movie: {
    title,
    poster_path,
    genres,
    release_date
} }) => {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)

    const handleMenuToggle = (isOpen: boolean = !isMenuOpen) => {
        setIsMenuOpen(isOpen);
    }

    const handleImgError = (event: SyntheticEvent<HTMLImageElement, Event>) => {
        event.target.src = ImagePlaceholder;
    }

    return (
        <figure className={styles['movie-tile']}>
            <img
                src={poster_path}
                alt={title}
                className={styles['movie-tile__img']}
                onError={handleImgError}
            />
            <figcaption className={styles['movie-tile__caption']}>
                <span className={styles['movie-tile__name']}>{ title }</span>
                {genres && <span className={styles['movie-tile__genres']}>{genres.join(',')}</span>}
                <span className={styles['movie-tile__year']}>{(new Date(release_date)).getFullYear()}</span>
            </figcaption>
            <div className={styles['movie-tile__actions']}>
                <button
                    className={styles['movie-tile__actions-btn']}
                    onClick={() => handleMenuToggle(true)}
                    data-testid="movie-tile-menu-btn"
                >⋮</button>
                {isMenuOpen && <menu className={styles['movie-tile__actions-menu']} data-testid="movie-tile-menu">
                    <li onClick={() => handleMenuToggle(false)}>✕</li>
                    <li>Edit</li>
                    <li>Delete</li>
                </menu>}
            </div>
        </figure>
    )
};

export default MovieTile;