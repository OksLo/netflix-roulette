import { type FC, useState, useEffect } from 'react';
import styles from './MovieListPage.module.scss';

import SearchIcon from 'src/components/icons/SearchIcon.tsx';

import GenreSelector from 'src/components/genreSelector/GenreSelector.tsx';
import SearchForm from 'src/components/searchForm/SearchForm.tsx'
import SortControl from 'src/components/sortControl/SortControl.tsx'
import MovieList from 'src/components/movieList/MovieList.tsx';
import MovieDetails from 'src/components/movieDetails/MovieDetails.tsx';

import { IMovie } from 'src/models/Movie.ts';

// mocks
import { genresMock, sortOptionsMock } from 'src/mocks/'

const MOVIE_API_PATH = 'http://localhost:4000/movies'

const MovieListPage: FC = () => {
    const [movies, setMovies] = useState<IMovie[]>([])
    const [searchQuery, setSearchQuery] = useState<string>('');
    const handleSearch = (query: string) => {
      setSearchQuery(query);
      console.log('[handleSearch] query: ', query)
    }

    const genres = genresMock;
    const [selectedGenre, setSelectedGenre] = useState<string>(genres[0])
    const handleGenreChange = (newGenre: string) => {
      setSelectedGenre(newGenre)
      console.log('[handleGenreChange] newGenre: ', newGenre)
    }

    const [sortBy, setSortBy] = useState<string>(sortOptionsMock[0].value);
    const handleSortChange = (newSortOption: string) => {
      console.log('[handleSortChange] newSortOption: ', newSortOption)
      setSortBy(newSortOption)
    }

    const [selectedMovie, setSelectedMovie] = useState<IMovie | null>(null);
    const handleMovieSelect = (movie: IMovie) => {
        setSelectedMovie(movie);
    }

    useEffect(() => {
        const fetchData = async () => {
            // setLoading(true); // Start loading state

            try {
                const searchParams = {
                    sortBy,
                    sortOrder: 'asc',
                    search: searchQuery,
                    searchBy: 'title',
                    filter: selectedGenre === 'all' ? '' : selectedGenre,
                    limit: '12',
                }
                // Replace this URL with the actual endpoint and pass sortParam if needed
                const response = await fetch(`${MOVIE_API_PATH}?${new URLSearchParams(searchParams).toString()}`);
                const result = await response.json();

                setMovies(result.data); // Set the fetched data
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                // setLoading(false); // Stop loading state
            }
        };

        fetchData();
    }, [searchQuery, selectedGenre, sortBy]);

    return (
        <>
            {!selectedMovie && <div className={styles['movie-list-page__search']}>
                <div className={styles['movie-list-page__search-title']}>Find your movie</div>
                <SearchForm initQuery={searchQuery} onSearch={handleSearch}/>
            </div>}
            {selectedMovie &&
                <div className={styles['movie-list-page__details']}>
                    <button
                        className={styles['movie-list-page__details-btn']}
                        onClick={() => setSelectedMovie(null)}
                    >
                        <SearchIcon/>
                    </button>
                    <MovieDetails movie={selectedMovie} className={styles['movie-list-page__details-card']}/>
                </div>
            }
            <div className={styles['movie-list-page__toolbar']}>
                <GenreSelector genres={genres} selected={selectedGenre} onSelect={handleGenreChange} />
                <SortControl options={sortOptionsMock} selectedOption={sortBy} onChange={handleSortChange}/>
            </div>
            <MovieList movies={movies} onMovieSelect={handleMovieSelect}/>

        </>
    )
};

export default MovieListPage;