import { type FC } from 'react';
import styles from './MovieDetails.module.scss';

import { getDurationFromMinutes } from 'src/utils/time.ts'

import { IMovie } from 'src/models/Movie.ts'

interface IMovieDetailsProps {
    movie: IMovie;
}

const MovieDetails: FC<IMovieDetailsProps> = (
    { movie: {
        title,
        imageUrl,
        relevantGenres,
        releaseDate,
        duration,
        description } }
) => {

    return (
        <article className={styles['movie-details']}>
            <img src={imageUrl} alt={title} className={styles['movie-details__img']}/>
            <div className={styles['movie-details__info']}>
                <h2 className={styles['movie-details__name']}>{ title }</h2>
                {relevantGenres && <div className={styles['movie-details__genres']}>{relevantGenres.join(',')}</div>}
                <div className={styles['movie-details__details']}>
                    <span className={styles['movie-details__year']}>{(new Date(releaseDate)).getFullYear()}</span>
                    <span className={styles['movie-details__duration']}>{getDurationFromMinutes(duration)}</span>
                </div>
                <div className={styles['movie-details__description']}>{description}</div>
            </div>
        </article>
    )
};

export default MovieDetails;