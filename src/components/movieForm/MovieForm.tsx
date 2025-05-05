import { type FC} from 'react';
import { useNavigate } from "react-router-dom";
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import styles from './MovieForm.module.scss';

import Input from "src/components/controls/Input.tsx";
import Select from "src/components/controls/Select.tsx";

import { MOVIE_DEFAULT } from "src/constants/movie.ts";

import { IMovie } from "src/models/Movie.ts";

import { genresMock } from 'src/mocks'

interface IMovieFormProps {
    movie?: IMovie;
    onSubmit: (movie: IMovie) => Promise<IMovie>;
}

const MovieForm: FC<IMovieFormProps> = ({ movie = MOVIE_DEFAULT, onSubmit }) => {
    const navigate = useNavigate();

    return (
        <Formik
            initialValues={movie}
            validationSchema={Yup.object({
                title: Yup.string()
                    .required('Required field'),
                release_date: Yup.date().required('Required field'),
                poster_path: Yup.string().url('Invalid poster path').required('Required field'),
                vote: Yup.number().positive().integer(),
                runtime: Yup.number().required('Required field').positive().integer(),
                overview: Yup.string().required('Required field'),
            })}
            onSubmit={async (values) => {
                const result = await onSubmit(values);
                if (result.id) {
                    navigate(`/${result.id}`);
                } else {
                    navigate('/');
                }
            }}
        >

                <Form id="form-movie" className={styles['form-movie']} >
                    <div className={styles['form-movie__row']}>
                        <Input
                            label="title"
                            name="title"
                        />
                        <Input
                            label="release date"
                            name="release_date"
                            placeholder="Select date"
                            type="date"
                        />
                    </div>
                    <div className={styles['form-movie__row']}>
                        <Input
                            label="poster path"
                            name="poster_path"
                            type="url"
                            placeholder="https://"
                        />
                        <Input
                            label="rating"
                            name="vote"
                            placeholder="Set rating"
                            type="number"
                        />
                    </div>
                    <div className={styles['form-movie__row']}>
                        <Select
                            options={genresMock}
                            label="Genre"
                            name="genres"
                            placeholder="Select genre"
                            multiple
                        />
                        <Input
                            label="Runtime"
                            name="runtime"
                            placeholder="minutes"
                            type="number"
                        />
                    </div>
                    <div className={`${styles['form-movie__row']} ${styles['form-movie__row_full']}`}>
                        <Input
                            label="Overview"
                            name="overview"
                            placeholder="Movie description"
                            type="textarea"
                        />
                    </div>
                    <div className={`${styles['form-movie__row']} ${styles['form-movie__row_actions']}`}>
                        <button type="reset" className="secondary">Reset</button>
                        <button type="submit">submit</button>
                    </div>
                </Form>

        </Formik>
    )
};

export default MovieForm;
