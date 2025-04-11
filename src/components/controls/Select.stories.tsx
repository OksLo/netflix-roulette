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
    value: genresMock[0],
    options: genresMock,
    onChange: () => {}
  }
};

export const WithLabel: Story = {
  args: {
    value: '',
    options: genresMock,
    name: 'genres',
    label: 'Select genre',
    onChange: () => {}
  }
};

export const WithPlaceholder: Story = {
  args: {
    value: '',
    options: genresMock,
    name: 'genres',
    label: 'Select genre',
    placeholder: 'Select genre',
    onChange: () => {}
  }
};

export const Disabled: Story = {
  args: {
    value: '',
    options: genresMock,
    name: 'genres',
    label: 'Select genre',
    placeholder: 'Select genre',
    disabled: true,
    onChange: () => {}
  }
};

export const Multiple: Story = {
  args: {
    value: '',
    options: genresMock,
    name: 'genres',
    label: 'Select genre',
    multiple: true,
    onChange: () => {}
  }
};

export const WithError: Story = {
  args: {
    value: genresMock[0],
    options: genresMock,
    name: 'genres',
    label: 'Select genre',
    error: 'Something is wrong',
    onChange: () => {}
  }
};