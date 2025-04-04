import type { Meta, StoryObj } from '@storybook/react';

import SearchForm from './SearchForm.tsx';

const meta = {
  component: SearchForm,
} satisfies Meta<typeof SearchForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onSearch: () => {}
  }
};

export const WithInitQuery: Story = {
  args: {
    initQuery: 'React',
    onSearch: () => {}
  }
};
