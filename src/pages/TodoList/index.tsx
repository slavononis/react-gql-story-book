import React from 'react';
import { useQuery, useMutation, Reference } from '@apollo/client';
import { GET_TODOS } from '@/graphql/queries';
import { CREATE_TODO, UPDATE_TODO, DELETE_TODO } from '@/graphql/mutations';
import {
  CreateTodoVariables,
  Todo,
  TodosData,
  TodoVariables,
  UpdateTodoVariables,
} from '@/graphql/types';

import { AddTodo } from '@/components/AddTodo';
import { Spinner } from '@/components/Spinner';
import { TodoItem } from '@/components/TodoItem';

import styles from './index.module.css';

const CURRENT_PAGE = 1;
const PAGE_SIZE = 10;

const TodoList: React.FC = () => {
  const { loading, error, data } = useQuery<TodosData>(GET_TODOS, {
    variables: {
      options: {
        paginate: {
          page: CURRENT_PAGE,
          limit: PAGE_SIZE,
        },
      },
    },
    notifyOnNetworkStatusChange: true,
  });
  const [createTodo] = useMutation<{ createTodo: Todo }, CreateTodoVariables>(
    CREATE_TODO,
    {
      update(cache, { data }) {
        if (!data?.createTodo) return;
        const existingTodos = cache.readQuery<TodosData>({
          query: GET_TODOS,
          variables: {
            options: {
              paginate: {
                page: CURRENT_PAGE,
                limit: PAGE_SIZE,
              },
            },
          },
        });

        cache.writeQuery({
          query: GET_TODOS,
          variables: {
            options: {
              paginate: {
                page: CURRENT_PAGE,
                limit: PAGE_SIZE,
              },
            },
          },
          data: {
            todos: {
              data: [
                // Prepend the new todo to the existing todos
                { ...data?.createTodo, id: Math.random().toString() },
                ...(existingTodos?.todos.data || []),
              ],
              meta: {
                totalCount: (existingTodos?.todos.meta.totalCount || 0) + 1,
              },
            },
          },
        });
      },
    }
  );

  const [updateTodo] = useMutation<{ updateTodo: Todo }, UpdateTodoVariables>(
    UPDATE_TODO
  );

  const [deleteTodo] = useMutation<{ deleteTodo: boolean }, TodoVariables>(
    DELETE_TODO,
    {
      refetchQueries: [{ query: GET_TODOS }],
      update(cache, { data }, { variables }) {
        if (!data?.deleteTodo) return;
        cache.modify({
          fields: {
            todos(existingTodos, { readField }) {
              return {
                ...existingTodos,
                data: (existingTodos.data || []).filter(
                  (todoRef: Reference) => {
                    return variables?.id !== readField('id', todoRef);
                  }
                ),
              };
            },
          },
        });
      },
    }
  );

  const handleToggle = async (id: string) => {
    const todo = data?.todos.data.find((t) => t.id === id);
    if (!todo) return;

    await updateTodo({
      variables: {
        id,
        completed: !todo.completed,
      },
    });
  };

  const handleDelete = async (id: string) => {
    await deleteTodo({ variables: { id } });
  };

  if (loading)
    return (
      <div className={styles.container}>
        <Spinner />
      </div>
    );
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className={styles.container}>
      <h1>GraphQL Todo List (GraphQLZero)</h1>
      <AddTodo
        onAddTodo={async (title) => {
          await createTodo({ variables: { title, completed: false } });
        }}
      />

      <ul className={styles.todoList}>
        {data?.todos.data.map((todo) => (
          <TodoItem
            todo={todo}
            onToggle={handleToggle}
            onDelete={handleDelete}
            key={todo.id}
          />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
