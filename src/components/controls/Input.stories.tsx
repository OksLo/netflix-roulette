import type { Meta, StoryObj } from '@storybook/react';

import Input from './Input';

const meta = {
  component: Input,
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'title',
  }
};

export const WithLabel: Story = {
  args: {
    name: 'title',
    label: 'Title',
  }
};

export const TypeNumber: Story = {
  args: {
    name: 'rating',
    label: 'Enter number',
    type: 'number',
  }
};

export const TypeDate: Story = {
  args: {
    name: 'date',
    label: 'Enter date',
    type: 'date',
  }
};

export const TypeTextarea: Story = {
  args: {
    name: 'description',
    label: 'Textarea',
    type: 'textarea',
  }
};

export const WithPlaceholder: Story = {
  args: {
    name: 'data',
    label: 'Placeholder',
    placeholder: 'Enter value',
  }
};

export const Disabled: Story = {
  args: {
    name: 'title',
    label: 'Title',
    disabled: true,
  }
};

export const WithError: Story = {
  args: {
    name: 'title',
    label: 'Title',
  }
};
