import { useState } from 'react';
import Counter from './components/counter/Counter.tsx'
import SearchForm from './components/searchForm/SearchForm.tsx'
import GenreSelector from './components/genreSelector/GenreSelector.tsx'
import MovieTile from './components/movieTile/MovieTile.tsx'
import MovieDetails from './components/movieDetails/MovieDetails.tsx'
import SortControl from './components/sortControl/SortControl.tsx'
import './App.css'

// mocks
import { moviesMock, sortOptionsMock } from './mocks/'



function App() {
  const handleSearch = (query: string) => {
    console.log('[handleSearch] query: ', query)
  }

  const genres = ['all', 'documentary', 'comedy', 'horror', 'crime']
  const selectedGenre = 'all'
  const handleGenreChange = (newGenre: string) => {
    console.log('[handleGenreChange] newGenre: ', newGenre)
  }

  const [sortBy, setSortBy] = useState<string>(sortOptionsMock[0].value);
  const handleSortChange = (newSortOption: string) => {
    console.log('[handleSortChange] newSortOption: ', newSortOption)
    setSortBy(newSortOption)
  }

  return (
    <>
      <h1>NetflixRoulette</h1>
      <h2>Counter component</h2>
      <Counter initValue={0}/>
      <h2>Search form</h2>
      <SearchForm initQuery={'react'} onSearch={handleSearch}/>
      <h2>Genre selector</h2>
      <GenreSelector genres={genres} selected={selectedGenre} onSelect={handleGenreChange}/>
      <h2>Movie tile</h2>
      <div style={{width: "300px"}}><MovieTile movie={moviesMock[0]}/></div>
      <h2>Movie details</h2>
      <MovieDetails movie={moviesMock[0]}/>
      <h2>Sort control</h2>
      <div><SortControl options={sortOptionsMock} selectedOption={sortBy} onChange={handleSortChange}/></div>
    </>
  )
}

export default App
