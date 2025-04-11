import type { Meta, StoryObj } from '@storybook/react';

import Dialog from './Dialog';
import MovieForm from '../movieForm/MovieForm.tsx';

import { MOVIE_DEFAULT } from "src/constants/movie.ts";
import { moviesMock } from "src/mocks";

const meta = {
  component: Dialog,
} satisfies Meta<typeof Dialog>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onClose: () => {},
    children: 'Some content',
    title: 'Default dialog',
  }
};

export const AddMovie: Story = () => (
    <Dialog
        onClose={() => {}}
        title={'Add movie'}
    >
      <MovieForm movie={MOVIE_DEFAULT} onSubmit={() => {}}/>
    </Dialog>
);

export const EditMovie: Story = () => (
    <Dialog
        onClose={() => {}}
        title={'Edit movie'}
    >
      <MovieForm movie={moviesMock[0]} onSubmit={() => {}}/>
    </Dialog>
);

export const DeleteMovie: Story = () => (
    <Dialog
        onClose={() => {}}
        title={'Delete movie'}
    >
      <div>Are you sure you want to delete this movie?</div>
      <button>Confirm</button>
    </Dialog>
);