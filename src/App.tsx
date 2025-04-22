import Header from 'src/layout/Header.tsx';
import Footer from 'src/layout/Footer.tsx';
import MovieListPage from 'src/pages/MovieListPage.tsx'

import './App.css'


function App() {

  return (
    <>
      <Header />
      <main className="app__content">
          <MovieListPage />
      </main>
      <Footer />
    </>
  )
}

export default App
