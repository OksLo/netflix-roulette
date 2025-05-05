import { type FC } from 'react';

import Dialog from 'src/components/dialog/Dialog.tsx';
import MovieForm from 'src/components/movieForm/MovieForm.tsx';

import { addMovie } from 'src/utils/movieApi.ts';

const MovieFormAdd: FC = () => {

    return (
        <Dialog title={'Add movie'}>
            <MovieForm onSubmit={addMovie}/>
        </Dialog>
    )
};

export default MovieFormAdd;
