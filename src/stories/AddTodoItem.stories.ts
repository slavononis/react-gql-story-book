import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { AddTodo } from '@/components/AddTodo';

const meta = {
  title: 'Components/AddTodo',
  component: AddTodo,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    onAddTodo: {
      action: 'added',
    },
  },
  args: {
    onAddTodo: fn(),
  },
} satisfies Meta<typeof AddTodo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onAddTodo: fn(async (title: string) => {
      console.log(title);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }),
  },
};

export const LoadingState: Story = {
  args: {
    onAddTodo: fn(async (title: string) => {
      console.log(title);
      await new Promise((resolve) => setTimeout(resolve, 3000));
    }),
  },
};
