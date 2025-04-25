import { type FC, type SyntheticEvent } from 'react';
import styles from './MovieDetails.module.scss';
import ImagePlaceholder from 'src/assets/imagePlaceholder.png';

import { getDurationFromMinutes } from 'src/utils/time.ts'

import { IMovie } from 'src/models/Movie.ts'

interface IMovieDetailsProps {
    movie: IMovie;
    className?: string;
}

const MovieDetails: FC<IMovieDetailsProps> = (
    { className, movie: {
        title,
        poster_path,
        genres,
        release_date,
        runtime,
        overview } }
) => {
    const handleImgError = (event: SyntheticEvent<HTMLImageElement, Event>) => {
       event.target.src = ImagePlaceholder;
    }

    return (
        <article className={`${styles['movie-details']} ${className}`}>
            <img
                src={poster_path}
                alt={title}
                className={styles['movie-details__img']}
                onError={handleImgError}/>
            <div className={styles['movie-details__info']}>
                <h2 className={styles['movie-details__name']}>{ title }</h2>
                {genres && <div className={styles['movie-details__genres']}>{genres.join(',')}</div>}
                <div className={styles['movie-details__details']}>
                    <span className={styles['movie-details__year']}>{(new Date(release_date)).getFullYear()}</span>
                    <span className={styles['movie-details__duration']}>{getDurationFromMinutes(runtime)}</span>
                </div>
                <div className={styles['movie-details__description']}>{overview}</div>
            </div>
        </article>
    )
};

export default MovieDetails;