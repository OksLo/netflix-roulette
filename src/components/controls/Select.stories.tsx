import type { Meta, StoryObj } from '@storybook/react';

import Select from './Select';

import { genresMock } from "src/mocks";

const meta = {
  component: Select,
} satisfies Meta<typeof Select>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'genres',
    options: genresMock,
  }
};

export const WithLabel: Story = {
  args: {
    options: genresMock,
    name: 'genres',
    label: 'Select genre',
  }
};

export const WithPlaceholder: Story = {
  args: {
    options: genresMock,
    name: 'genres',
    label: 'Select genre',
    placeholder: 'Select genre',
  }
};

export const Disabled: Story = {
  args: {
    options: genresMock,
    name: 'genres',
    label: 'Select genre',
    placeholder: 'Select genre',
    disabled: true,
  }
};

export const Multiple: Story = {
  args: {
    options: genresMock,
    name: 'genres',
    label: 'Select genre',
    multiple: true,
  }
};

export const WithError: Story = {
  args: {
    options: genresMock,
    name: 'genres',
    label: 'Select genre',
  }
};
