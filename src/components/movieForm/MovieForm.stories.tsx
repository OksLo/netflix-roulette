import type { Meta, StoryObj } from '@storybook/react';

import MovieForm from './MovieForm';

import { MOVIE_DEFAULT } from "src/constants/movie.ts";
import { moviesMock } from "src/mocks";

const meta = {
  component: MovieForm,
} satisfies Meta<typeof MovieForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    movie: {},
    onSubmit: () => {}
  }
};

export const AddMovie: Story = {
  args: {
    movie: MOVIE_DEFAULT,
    onSubmit: () => {}
  }
};

export const EditMovie: Story = {
  args: {
    movie: moviesMock[0],
    onSubmit: () => {}
  }
};