import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, deleteTask } from '../store';
import { Task } from '../types';
import TaskForm from './TaskForm';

const TaskList: React.FC = () => {
  const tasks = useSelector((state: RootState) => state.tasks);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const filteredTasks = tasks
    .filter(task =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());

  const getPriorityClass = (priority: string) => {
    switch (priority) {
      case 'high': return 'priority-high';
      case 'medium': return 'priority-medium';
      default: return 'priority-low';
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search tasks"
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 mb-4 border border-gray rounded"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filteredTasks.map(task => (
          <div key={task.id} className="task-card p-4 bg-white rounded-lg shadow-md">
            <h3 className="font-bold text-lg mb-2">{task.title}</h3>
            <p className="text-sm mb-2">{task.description}</p>
            <p className="text-sm mb-2">Due: {task.dueDate}</p>
            <div className="flex justify-between items-center">
              <span className={`text-xs font-semibold ${getPriorityClass(task.priority)}`}>
                {task.priority}
              </span>
              <span className="text-xs font-semibold">{task.status}</span>
            </div>
            <div className="mt-4 flex justify-end space-x-2">
              <button onClick={() => setEditingTask(task)} className="btn-primary text-sm">Edit</button>
              <button onClick={() => dispatch(deleteTask(task.id))} className="btn-primary text-sm">Delete</button>
            </div>
          </div>
        ))}
      </div>
      {editingTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-secondary p-4 rounded-lg w-full max-w-md">
            <TaskForm task={editingTask} onClose={() => setEditingTask(null)} />
            <button onClick={() => setEditingTask(null)} className="btn-primary mt-4 w-full">Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskList;