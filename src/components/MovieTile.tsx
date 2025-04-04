import { type FC, useState } from 'react';
import styles from './MovieTile.module.scss';

import { IMovie } from '../models/Movie'


interface IMovieTileProps {
    movie: IMovie;
}

const MovieTile: FC<IMovieTileProps> = ({ movie: { name, imageUrl, relevantGenres, releaseYear } }) => {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)

    const handleMenuToggle = (isOpen: boolean = !isMenuOpen) => {
        setIsMenuOpen(isOpen);
    }

    return (
        <figure className={styles['movie-tile']}>
            <img src={imageUrl} alt={name} className={styles['movie-tile__img']}/>
            <figcaption className={styles['movie-tile__caption']}>
                <span className={styles['movie-tile__name']}>{ name }</span>
                {relevantGenres && <span className={styles['movie-tile__genres']}>{relevantGenres.join(',')}</span>}
                <span className={styles['movie-tile__year']}>{releaseYear}</span>
            </figcaption>
            <div className={styles['movie-tile__actions']}>
                <button className={styles['movie-tile__actions-btn']} onClick={() => handleMenuToggle(true)}>⋮</button>
                {isMenuOpen && <menu className={styles['movie-tile__actions-menu']}>
                    <li onClick={() => handleMenuToggle(false)}>✕</li>
                    <li>Edit</li>
                    <li>Delete</li>
                </menu>}
            </div>
        </figure>
    )
};

export default MovieTile;