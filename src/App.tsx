import Counter from './components/Counter.tsx'
import SearchForm from './components/SearchForm.tsx'
import GenreSelector from './components/GenreSelector.tsx'
import MovieTile from './components/MovieTile.tsx'
import './App.css'

import { IMovie } from './models/Movie'

const moviesMock: IMovie[] = [
    {
        name: 'Reservoir dogs',
        imageUrl: 'https://m.media-amazon.com/images/M/MV5BYjg4MmU3NWYtMWE5ZC00ZmNmLWIyZjItMGU4NmYxMjdmNzQ1XkEyXkFqcGc@._V1_.jpg',
        releaseYear: '1992',
        relevantGenres: ['Oscar winning Movie']
    }
]

function App() {
  const handleSearch = (query: string) => {
    console.log('[handleSearch] query: ', query)
  }

  const genres = ['all', 'documentary', 'comedy', 'horror', 'crime']
  const selectedGenre = 'all'
  const handleGenreChange = (newGenre: string) => {
    console.log('[handleGenreChange] newGenre: ', newGenre)
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
    </>
  )
}

export default App
