import type { Meta, StoryObj } from '@storybook/react';

import SortControl from './SortControl.tsx';

import { sortOptionsMock } from "src/mocks";

const meta = {
  component: SortControl,
} satisfies Meta<typeof SortControl>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    options: sortOptionsMock,
    selectedOption: sortOptionsMock[0].value,
    onChange: () => {}
  }
};