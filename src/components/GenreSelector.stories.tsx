import type { Meta, StoryObj } from '@storybook/react';

import GenreSelector from './GenreSelector';

const meta = {
  component: GenreSelector,
} satisfies Meta<typeof GenreSelector>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    genres: ['all', 'documentary', 'comedy', 'horror', 'crime'],
    onSelect: () => {}
  }
};

export const WithSelectedValue: Story = {
  args: {
    genres: ['all', 'documentary', 'comedy', 'horror', 'crime'],
    selected: 'horror',
    onSelect: () => {}
  }
};