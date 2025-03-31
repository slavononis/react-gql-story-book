import { useState } from 'react';

import { Spinner } from '@/components/Spinner';

import styles from './index.module.css';

type AddTodoProps = {
  onAddTodo: (title: string) => Promise<void>;
};

export const AddTodo: React.FC<AddTodoProps> = ({ onAddTodo }) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const handleAddTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    setLoading(true);
    try {
      await onAddTodo(inputValue);
      setInputValue('');
    } finally {
      setLoading(false);
    }
  };
  return (
    <form onSubmit={handleAddTodo} className={styles.addTodoForm}>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Add new todo"
        className={styles.addTodoFormInput}
      />
      {loading ? (
        <Spinner />
      ) : (
        <button type="submit" className={styles.addTodoFormButton}>
          Add
        </button>
      )}
    </form>
  );
};
