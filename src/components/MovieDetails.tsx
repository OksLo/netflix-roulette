import { type FC } from 'react';
import styles from './MovieDetails.module.scss';

import { getDurationFromMinutes } from '../utils/time'

import { IMovie } from '../models/Movie'


interface IMovieDetailsProps {
    movie: IMovie;
}

const MovieDetails: FC<IMovieDetailsProps> = (
    { movie: {
        name,
        imageUrl,
        relevantGenres,
        releaseYear,
        duration,
        description } }
) => {

    return (
        <article className={styles['movie-details']}>
            <img src={imageUrl} alt={name} className={styles['movie-details__img']}/>
            <div className={styles['movie-details__info']}>
                <h2 className={styles['movie-details__name']}>{ name }</h2>
                {relevantGenres && <div className={styles['movie-details__genres']}>{relevantGenres.join(',')}</div>}
                <div className={styles['movie-details__details']}>
                    <span className={styles['movie-details__year']}>{releaseYear}</span>
                    <span className={styles['movie-details__duration']}>{getDurationFromMinutes(duration)}</span>
                </div>
                <div className={styles['movie-details__description']}>{description}</div>
            </div>
        </article>
    )
};

export default MovieDetails;