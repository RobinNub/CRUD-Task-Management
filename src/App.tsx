import React from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

const App: React.FC = () => (
  <div className="container">
    <h1 className="title">Task Manager</h1>
    <TaskForm />
    <div className="task-list">
      <TaskList />
    </div>
  </div>
);

export default App;