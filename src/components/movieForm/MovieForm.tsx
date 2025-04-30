import { type ChangeEvent, type FormEvent, type FC, useState} from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import styles from './MovieForm.module.scss';

import Input from "src/components/controls/Input.tsx";
import Select from "src/components/controls/Select.tsx";

import {MOVIE_DEFAULT} from "src/constants/movie.ts";

import { IMovie } from "src/models/Movie.ts";

import { genresMock } from 'src/mocks'

interface IMovieFormProps {
    movie?: IMovie;
    onSubmit: (movie: IMovie) => void;
}

const MovieForm: FC<IMovieFormProps> = ({ movie = MOVIE_DEFAULT, onSubmit }) => {
    const formik = useFormik({
        initialValues: movie,
        validationSchema: Yup.object({
            title: Yup.string()
                .required('Required'),
            // lastName: Yup.string()
            //     .max(20, 'Must be 20 characters or less')
            //     .required('Required'),
            // email: Yup.string().email('Invalid email address').required('Required'),
        }),
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
            // onSubmit(values);
        },
    });

    // const [movieEntity, setMovieEntity] = useState<IMovie>(movie)

    // const handleMovieChange = (
    //     event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    // ) => {
    //     const key = event.target.name;
    //     const value = event.target.value;
    //
    //     setMovieEntity({...movieEntity, ...{ [key]: value } })
    // }
    //
    // const handleMovieGenresChange = (value: string | string[], key: string) => {
    //     setMovieEntity({...movieEntity, ...{ [key]: value } })
    // }
    //
    // const handleMovieReset = () => {
    //     setMovieEntity(movie);
    // }
    //
    // const handleFormSubmit = (event: FormEvent) => {
    //     event.preventDefault();
    //     onSubmit(movieEntity);
    // }

    return (
        <form id="form-movie" className={styles['form-movie']} onSubmit={formik.handleSubmit}>
            <div className={styles['form-movie__row']}>
                <Input
                    label="title"
                    name="title"
                    value={formik.values.title}
                    onChange={formik.handleChange}
                />
                <Input
                    label="release date"
                    name="release_date"
                    placeholder="Select date"
                    type="date"
                    value={formik.values.release_date}
                    onChange={formik.handleChange}
                />
            </div>
            <div className={styles['form-movie__row']}>
                <Input
                    label="movie url"
                    name="url"
                    type="url"
                    placeholder="https://"
                    value={formik.values.url}
                    onChange={formik.handleChange}/>
                <Input
                    label="rating"
                    name="vote"
                    placeholder="Set rating"
                    type="number"
                    value={formik.values.vote}
                    onChange={formik.handleChange}
                />
            </div>
            <div className={styles['form-movie__row']}>
                <Select
                    value={formik.values.genres}
                    options={genresMock}
                    label="Genre"
                    name="genres"
                    placeholder="Select genre"
                    multiple
                    onChange={formik.handleChange}/>
                <Input
                    label="Runtime"
                    name="runtime"
                    placeholder="minutes"
                    type="number"
                    value={formik.values.runtime}
                    onChange={formik.handleChange}
                />
            </div>
            <div className={`${styles['form-movie__row']} ${styles['form-movie__row_full']}`}>
                <Input
                    label="Overview"
                    name="overview"
                    placeholder="Movie description"
                    type="textarea"
                    value={formik.values.overview}
                    onChange={formik.handleChange}
                />
            </div>
            <div className={`${styles['form-movie__row']} ${styles['form-movie__row_actions']}`}>
                <button type="reset" onClick={formik.resetForm} className="secondary">Reset</button>
                <button type="submit">submit</button>
            </div>
        </form>
    )
};

export default MovieForm;