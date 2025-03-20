import Counter from './components/Counter.tsx'
import SearchForm from './components/SearchForm.tsx'
import GenreSelector from './components/GenreSelector.tsx'
import './App.css'

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
    </>
  )
}

export default App
