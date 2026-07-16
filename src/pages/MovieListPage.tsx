import { type FC, useState, useEffect } from 'react';
import { Outlet, useSearchParams } from "react-router-dom";
import styles from './MovieListPage.module.scss';

import Spinner from 'src/components/icons/Spinner.tsx';

import GenreSelector from 'src/components/genreSelector/GenreSelector.tsx';
import SortControl from 'src/components/sortControl/SortControl.tsx';
import MovieList from 'src/components/movieList/MovieList.tsx';

import { SortOrder } from 'src/models/Api.ts';
import { type IMovie } from 'src/models/Movie.ts';

import { getMovies } from 'src/utils/movieApi.ts';

// mocks
import { genresMock, sortOptionsMock } from 'src/mocks/'


const MovieListPage: FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const updateSearchParams = (paramKey: string, paramValue: string) => {
        const updatedParams = new URLSearchParams(searchParams);
        if (paramValue) {
          updatedParams.set(paramKey, paramValue);
        } else {
          updatedParams.delete(paramKey);
        }
        setSearchParams(updatedParams);
    }

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [errorMessage, setErrorMessage] = useState<string>('');

    const [movies, setMovies] = useState<IMovie[]>([])

    const genres = genresMock;
    const [selectedGenre, setSelectedGenre] = useState<string>(searchParams.get('genre') || genres[0])
    const handleGenreChange = (newGenre: string) => {
      setSelectedGenre(newGenre);
      updateSearchParams('genre', newGenre);
    }

    const [sortBy, setSortBy] = useState<string>(searchParams.get('sortBy') ?? sortOptionsMock[0].value);
    const handleSortChange = (newSortOption: string) => {
      setSortBy(newSortOption);
      updateSearchParams('sortBy', newSortOption);
    }

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);

            try {
                const fetchParams = {
                    sortBy,
                    sortOrder: SortOrder.ASC,
                    search: searchParams.get('search') || '',
                    searchBy: 'title',
                    filter: selectedGenre === 'all' ? '' : selectedGenre,
                    limit: '12',
                };
                const movies = await getMovies(fetchParams);

                if (movies) {
                    setMovies(movies);
                }
            } catch (e) {
                setErrorMessage(e instanceof Error ? e.message : String(e));
            }
            finally {
                setIsLoading(false);
            }
        }

        fetchData();
    }, [searchParams, selectedGenre, sortBy]);

    return (
        <>
            <div className={styles['movie-list-page__outlet']}>
                <Outlet />
            </div>
            <div className={styles['movie-list-page__toolbar']}>
                <GenreSelector genres={genres} selected={selectedGenre} onSelect={handleGenreChange} />
                <SortControl options={sortOptionsMock} selectedOption={sortBy} onChange={handleSortChange}/>
            </div>
            {isLoading && <div className={styles['movie-list-page__spinner']}><Spinner /></div>}
            {!isLoading && !errorMessage && <MovieList movies={movies}/>}
            {!isLoading && errorMessage && <div>{ errorMessage }</div>}
        </>
    )
};

export default MovieListPage;