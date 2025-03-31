import { Navigate, Route, Routes } from 'react-router';

import TodoList from '@/pages/TodoList';
import { AppRoutePaths } from '@/config/routes';

import '@/App.css';

function App() {
  return (
    <Routes>
      <Route index element={<Navigate to={AppRoutePaths.TodoList} />} />
      <Route path={AppRoutePaths.TodoList} element={<TodoList />} />
    </Routes>
  );
}

export default App;
