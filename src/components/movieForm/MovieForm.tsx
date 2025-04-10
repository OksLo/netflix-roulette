import { type ChangeEvent, type FormEvent, type FC, useState} from 'react';
import styles from './MovieForm.module.scss';

import Input from "src/components/controls/Input.tsx";
import Select from "src/components/controls/Select.tsx";

import { IMovie } from "src/models/Movie.ts";

import { genresMock } from 'src/mocks'

interface IMovieFormProps {
    movie: IMovie;
    onSubmit: (movie: IMovie) => void;
}

const MovieForm: FC<IMovieFormProps> = ({ movie, onSubmit }) => {
    const [movieEntity, setMovieEntity] = useState<IMovie>(movie)

    const handleMovieChange = (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const key = event.target.name;
        const value = event.target.value;

        setMovieEntity({...movieEntity, ...{ [key]: value } })
    }

    const handleMovieGenresChange = (value: string | string[], key: string) => {
        setMovieEntity({...movieEntity, ...{ [key]: value } })
    }

    const handleMovieReset = () => {
        setMovieEntity(movie);
    }

    const handleFormSubmit = (event: FormEvent) => {
        event.preventDefault();
        onSubmit(movieEntity);
    }

    return (
        <form id="form-movie" className={styles['form-movie']} onSubmit={handleFormSubmit}>
            <div className={styles['form-movie__row']}>
                <Input
                    label="title"
                    name="title"
                    value={movieEntity.title}
                    onChange={handleMovieChange}
                />
                <Input
                    label="release date"
                    name="releaseDate"
                    placeholder="Select date"
                    type="date"
                    value={movieEntity.releaseDate}
                    onChange={handleMovieChange}
                />
            </div>
            <div className={styles['form-movie__row']}>
                <Input
                    label="movie url"
                    name="url"
                    type="url"
                    placeholder="https://"
                    value={movieEntity.url}
                    onChange={handleMovieChange}/>
                <Input
                    label="rating"
                    name="rating"
                    placeholder="Set rating"
                    type="number"
                    value={movieEntity.rating}
                    onChange={handleMovieChange}
                />
            </div>
            <div className={styles['form-movie__row']}>
                <Select
                    value={movieEntity.relevantGenres}
                    options={genresMock}
                    label="Genre"
                    name="relevantGenres"
                    placeholder="Select genre"
                    multiple
                    onChange={handleMovieGenresChange}/>
                <Input
                    label="Runtime"
                    name="duration"
                    placeholder="minutes"
                    type="number"
                    value={movieEntity.duration}
                    onChange={handleMovieChange}
                />
            </div>
            <div className={`${styles['form-movie__row']} ${styles['form-movie__row_full']}`}>
                <Input
                    label="Overview"
                    name="description"
                    placeholder="Movie description"
                    type="textarea"
                    value={movieEntity.description}
                    onChange={handleMovieChange}
                />
            </div>
            <div className={`${styles['form-movie__row']} ${styles['form-movie__row_actions']}`}>
                <button type="reset" onClick={handleMovieReset} className="secondary">Reset</button>
                <button type="submit">submit</button>
            </div>
        </form>
    )
};

export default MovieForm;