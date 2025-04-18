import type { Meta, StoryObj } from '@storybook/react';

import MovieTile from './MovieTile.tsx';

import { moviesMock } from "src/mocks";

const meta = {
  component: MovieTile,
} satisfies Meta<typeof MovieTile>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    movie: moviesMock[0]
  }
};