import { Todo } from '@/graphql/types';

import styles from './index.module.css';
import { useState } from 'react';
import { Spinner } from '../Spinner';

type TodoItemProps = {
  /** Todo item data */
  todo: Todo;
  /** Toggle completed status */
  onToggle: (id: string) => Promise<void>;
  /** Remove todo item */
  onDelete: (id: string) => Promise<void>;
};

export const TodoItem: React.FC<TodoItemProps> = ({
  onDelete,
  onToggle,
  todo,
}: TodoItemProps) => {
  const [loading, setLoading] = useState(false);
  const handleToggle = async () => {
    setLoading(true);
    try {
      await onToggle(todo.id);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      await onDelete(todo.id);
    } finally {
      setLoading(false);
    }
  };

  return (
    <li className={styles.todoItem}>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={handleToggle}
          />
          <span style={{ flexGrow: 1 }}>{todo.title}</span>
          <button onClick={handleDelete} className={styles.delButton}>
            Delete
          </button>
        </>
      )}
    </li>
  );
};
