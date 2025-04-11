import type { Meta, StoryObj } from '@storybook/react';

import Input from './Input';

const meta = {
  component: Input,
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 'Bohemian Rhapsody',
    name: 'title',
    onChange: () => {}
  }
};

export const WithLabel: Story = {
  args: {
    value: 'Bohemian Rhapsody',
    name: 'title',
    label: 'Title',
    onChange: () => {}
  }
};

export const TypeNumber: Story = {
  args: {
    value: 35,
    name: 'rating',
    label: 'Enter number',
    type: 'number',
    onChange: () => {}
  }
};

export const TypeDate: Story = {
  args: {
    value: '1992-09-12',
    name: 'date',
    label: 'Enter date',
    type: 'date',
    onChange: () => {}
  }
};

export const TypeTextarea: Story = {
  args: {
    value: 'Moana Waialiki is a sea voyaging enthusiast and the only daughter of a chief in a long line of navigators. When her island\'s fishermen can\'t catch any fish and the crops fail, she learns that the demigod Maui caused the blight by stealing the heart of the goddess, Te Fiti. The only way to heal the island is to persuade Maui to return Te Fiti\'s heart, so Moana sets off on an epic journey across the Pacific. The film is based on stories from Polynesian mythology.',
    name: 'description',
    label: 'Textarea',
    type: 'textarea',
    onChange: () => {}
  }
};

export const WithPlaceholder: Story = {
  args: {
    value: '',
    name: 'data',
    label: 'Placeholder',
    placeholder: 'Enter value',
    onChange: () => {}
  }
};

export const Disabled: Story = {
  args: {
    value: 'Bohemian Rhapsody',
    name: 'title',
    label: 'Title',
    disabled: true,
    onChange: () => {}
  }
};

export const WithError: Story = {
  args: {
    value: 'Bohemian Rhapsody',
    name: 'title',
    label: 'Title',
    error: 'Something is wrong',
    onChange: () => {}
  }
};