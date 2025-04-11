import { useState } from 'react';
import Counter from './components/counter/Counter.tsx'
import SearchForm from './components/searchForm/SearchForm.tsx'
import GenreSelector from './components/genreSelector/GenreSelector.tsx'
import MovieTile from './components/movieTile/MovieTile.tsx'
import MovieDetails from './components/movieDetails/MovieDetails.tsx'
import SortControl from './components/sortControl/SortControl.tsx'
import Dialog from './components/dialog/Dialog.tsx'
import MovieForm from './components/movieForm/MovieForm.tsx'
import './App.css'

// constants
import { MOVIE_DEFAULT } from "src/constants/movie.ts";

//models
import { IMovie } from 'src/models/Movie.ts';

// mocks
import { genresMock, moviesMock, sortOptionsMock } from './mocks/'

function App() {
  const handleSearch = (query: string) => {
    console.log('[handleSearch] query: ', query)
  }

  const selectedGenre = genresMock[0]
  const handleGenreChange = (newGenre: string) => {
    console.log('[handleGenreChange] newGenre: ', newGenre)
  }

  const [sortBy, setSortBy] = useState<string>(sortOptionsMock[0].value);
  const handleSortChange = (newSortOption: string) => {
    console.log('[handleSortChange] newSortOption: ', newSortOption)
    setSortBy(newSortOption)
  }

  const [isDialogEditOpen, setIsDialogEditOpen] = useState(false);
  const [isDialogAddOpen, setIsDialogAddOpen] = useState(false);

  const handleFormSubmit = (movie: IMovie) => {
    console.log('[handleFormSubmit] movie: ', movie);
  }

  return (
    <>
      <h1>NetflixRoulette</h1>
      <h2>Counter component</h2>
      <Counter initValue={0}/>
      <h2>Search form</h2>
      <SearchForm initQuery={'react'} onSearch={handleSearch}/>
      <h2>Genre selector</h2>
      <GenreSelector genres={genresMock} selected={selectedGenre} onSelect={handleGenreChange}/>
      <h2>Movie tile</h2>
      <div style={{width: "300px"}}><MovieTile movie={moviesMock[0]}/></div>
      <h2>Movie details</h2>
      <MovieDetails movie={moviesMock[0]}/>
      <h2>Sort control</h2>
      <div><SortControl options={sortOptionsMock} selectedOption={sortBy} onChange={handleSortChange}/></div>
      <h2>Edit Dialog</h2>
      <div>
          <button onClick={() => setIsDialogEditOpen(true)}>
              Open edit dialog
          </button>
          {isDialogEditOpen && <Dialog
              onClose={() => setIsDialogEditOpen(false)}
              title={'Edit movie'}>
              <MovieForm movie={moviesMock[0]} onSubmit={handleFormSubmit}/>
          </Dialog>}
      </div>
      <h2>Add Dialog</h2>
      <div>
        <button onClick={() => setIsDialogAddOpen(true)}>
            Open add dialog
        </button>
        {isDialogAddOpen && <Dialog
            onClose={() => setIsDialogAddOpen(false)}
            title={'Add movie'}>
            <MovieForm movie={MOVIE_DEFAULT} onSubmit={handleFormSubmit}/>
        </Dialog>}
      </div>
    </>
  )
}

export default App
