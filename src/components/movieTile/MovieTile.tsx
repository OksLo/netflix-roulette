import { type FC, useState } from 'react';
import styles from './MovieTile.module.scss';

import { IMovie } from 'src/models/Movie.ts'

interface IMovieTileProps {
    movie: IMovie;
}

const MovieTile: FC<IMovieTileProps> = ({ movie: { title, imageUrl, relevantGenres, releaseDate } }) => {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)

    const handleMenuToggle = (isOpen: boolean = !isMenuOpen) => {
        setIsMenuOpen(isOpen);
    }

    return (
        <figure className={styles['movie-tile']}>
            <img src={imageUrl} alt={title} className={styles['movie-tile__img']}/>
            <figcaption className={styles['movie-tile__caption']}>
                <span className={styles['movie-tile__name']}>{ title }</span>
                {relevantGenres && <span className={styles['movie-tile__genres']}>{relevantGenres.join(',')}</span>}
                <span className={styles['movie-tile__year']}>{(new Date(releaseDate)).getFullYear()}</span>
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