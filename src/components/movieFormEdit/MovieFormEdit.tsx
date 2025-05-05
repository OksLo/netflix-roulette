import { type FC } from 'react';
import { useLocation } from "react-router-dom";

import Dialog from 'src/components/dialog/Dialog.tsx';
import MovieForm from 'src/components/movieForm/MovieForm.tsx';

import { editMovie } from 'src/utils/movieApi.ts';

const MovieFormEdit: FC = () => {
    const location = useLocation();
    const { movie } = location.state || {};

    return (
        <Dialog title={'Add movie'}>
            <MovieForm movie={movie} onSubmit={editMovie}/>
        </Dialog>
    )
};

export default MovieFormEdit;
