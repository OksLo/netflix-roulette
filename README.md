# Netflix Roulette

A movie browsing and management SPA built with React 19 and TypeScript. Browse a catalog of movies, search and filter by genre, view full details, and add or edit entries — all backed by a REST API.

## Features

- **Search & filter** — full-text search with genre filter pills and sort-by dropdown; all state is synced to URL search params for deep-linking
- **Movie details** — dedicated detail page loaded via React Router's `loader` API before render
- **Add / Edit movies** — modal dialog forms with Formik + Yup validation, mounted as nested routes so the list stays rendered behind them
- **Delete movies** — context menu (⋮) on each movie tile

## Tech Stack

| | |
|---|---|
| UI | React 19, TypeScript |
| Build | Vite 6 |
| Routing | React Router DOM v7 |
| Forms | Formik 2 + Yup |
| Styling | SCSS Modules |
| Testing | Jest 29, React Testing Library |
| Component dev | Storybook 8 + Chromatic |

## Getting Started

The app expects a movies REST API running at `http://localhost:4000/movies`.

```bash
npm install
npm run dev        # dev server at http://localhost:5173
npm test           # unit tests
npm run storybook  # component explorer at http://localhost:6006
```

## Project Structure

```
src/
  components/   # reusable UI components
  pages/        # route-level page components
  layout/       # Header, Footer, Layout shell
  utils/        # API client (movieApi.ts)
  constants/    # API base URL
  mocks/        # fixture data for tests and dev
```
