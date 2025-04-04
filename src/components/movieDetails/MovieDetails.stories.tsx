import type { Meta, StoryObj } from '@storybook/react';

import MovieDetails from './MovieDetails.tsx';

import { moviesMock } from "src/mocks";

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