import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from 'src/layout/Layout.tsx';
import MovieListPage from 'src/pages/MovieListPage.tsx';
import SearchForm from 'src/components/searchForm/SearchForm.tsx';
import MovieDetailsPage, { MovieLoader } from 'src/pages/MovieDetailsPage.tsx';
import ErrorPage from 'src/pages/ErrorPage.tsx';

import './App.css'

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/',
                element: <MovieListPage />,
                children: [
                    {
                        path: '/',
                        element: <SearchForm />,
                    },
                    {
                        path: '/:movieId',
                        element: <MovieDetailsPage />,
                        loader: MovieLoader,
                    }
                ]
            }
        ]
    },
]);


function App() {
  return <RouterProvider router={router} />;
}

export default App
