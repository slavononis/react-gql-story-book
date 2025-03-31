import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { TodoItem } from '@/components/TodoItem';
import { Todo } from '@/graphql/types';

const mockTodo: Todo = {
  id: '1',
  title: 'Example todo item',
  completed: false,
};

const meta = {
  title: 'Components/TodoItem',
  component: TodoItem,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    todo: {
      control: {
        type: 'object',
      },
    },
    onToggle: {
      action: 'toggled',
    },
    onDelete: {
      action: 'deleted',
    },
  },
  args: {
    todo: mockTodo,
    onToggle: fn(),
    onDelete: fn(),
  },
} satisfies Meta<typeof TodoItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    todo: {
      ...mockTodo,
      title: 'Default todo item',
      completed: false,
    },
    onDelete: fn(async (id: string) => {
      console.log(id);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }),
    onToggle: fn(async (id: string) => {
      console.log(id);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }),
  },
};

export const Completed: Story = {
  args: {
    todo: {
      ...mockTodo,
      title: 'Completed todo item',
      completed: true,
    },
    onDelete: fn(async (id: string) => {
      console.log(id);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }),
    onToggle: fn(async (id: string) => {
      console.log(id);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }),
  },
};

export const LongText: Story = {
  args: {
    todo: {
      ...mockTodo,
      title:
        'This is a very long todo item text that should demonstrate how the component handles overflow or wrapping',
      completed: false,
    },
    onDelete: fn(async (id: string) => {
      console.log(id);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }),
    onToggle: fn(async (id: string) => {
      console.log(id);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }),
  },
};
