import { type FC } from 'react';
import {Link, useLoaderData, useSearchParams} from "react-router-dom";
import styles from './MovieDetailsPage.module.scss';

import SearchIcon from 'src/components/icons/SearchIcon.tsx';
import MovieDetails from "src/components/movieDetails/MovieDetails.tsx";
import { IMovie } from "src/models/Movie.ts";

import { getMovieById } from 'src/utils/getData.ts';

export async function MovieLoader({ params }: { params: { movieId: string } }): Promise<IMovie | undefined> {
    const { movieId } = params;

    return await getMovieById(movieId);
}

const MovieDetailsPage: FC = () => {
    const movie: IMovie = useLoaderData();

    const [searchParams] = useSearchParams();
    const queryParams = new URLSearchParams(searchParams);

    return (
        <div className={styles['movie-details-page']}>
            <Link
                className={styles['movie-details-page__btn']}
                to={`/?${queryParams}`}
            >
                <SearchIcon/>
            </Link>
            {movie && <MovieDetails movie={movie} className={styles['movie-details-page__card']}/>}
        </div>
    )
}

export default MovieDetailsPage;