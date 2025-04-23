import { type FC } from 'react';
import { Link, useLoaderData } from "react-router-dom";
import styles from './MovieDetailsPage.module.scss';

import SearchIcon from 'src/components/icons/SearchIcon.tsx';
import MovieDetails from "src/components/movieDetails/MovieDetails.tsx";
import { IMovie } from "src/models/Movie.ts";
import { MOVIE_API_PATH } from "src/constants/api.ts";

export async function MovieLoader({ params }: { params: { movieId: string } }): Promise<IMovie> {
    const { movieId } = params;
    console.log('[MovieLoader] movieId: ', movieId);

    const response = await fetch(`${MOVIE_API_PATH}/${movieId}`);
    if (!response.ok) {
        throw new Response("Failed to fetch the item.", { status: 404 });
    }

    return  await response.json();
}

const MovieDetailsPage: FC = () => {
    const movie = useLoaderData();

    return (
        <div className={styles['movie-details-page']}>
            <Link
                className={styles['movie-details-page__btn']}
                to={'/'}
            >
                <SearchIcon/>
            </Link>
            {movie && <MovieDetails movie={movie} className={styles['movie-details-page__card']}/>}
        </div>
    )
}

export default MovieDetailsPage;