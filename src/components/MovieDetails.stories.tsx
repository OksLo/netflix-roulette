import type { Meta, StoryObj } from '@storybook/react';

import MovieDetails from './MovieDetails';

import { moviesMock } from "../mocks";

const meta = {
  component: MovieDetails,
} satisfies Meta<typeof MovieDetails>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    movie: moviesMock[0]
  }
};