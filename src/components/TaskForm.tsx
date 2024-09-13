import React from 'react';
import { useDispatch } from 'react-redux';
import { addTask, updateTask } from '../store';
import { Task } from '../types';

interface TaskFormProps {
  task?: Task;
  onClose?: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ task, onClose }) => {
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newTask: Task = {
      id: task?.id || Date.now().toString(),
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      dueDate: formData.get('dueDate') as string,
      priority: formData.get('priority') as 'low' | 'medium' | 'high',
      status: formData.get('status') as 'todo' | 'in-progress' | 'completed',
    };
    dispatch(task ? updateTask(newTask) : addTask(newTask));
    e.currentTarget.reset();
    if (onClose) onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <div className="form-group">
        <input id="title" name="title" defaultValue={task?.title} placeholder="Title" required className="input-field" />
        <input id="dueDate" name="dueDate" type="date" defaultValue={task?.dueDate} required className="input-field" />
      </div>
      <div className="form-group">
        <textarea id="description" name="description" defaultValue={task?.description} placeholder="Description" className="textarea-field" />
      </div>
      <div className="form-group">
        <select id="priority" name="priority" defaultValue={task?.priority} required className="input-field">
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <select id="status" name="status" defaultValue={task?.status} required className="input-field">
          <option value="todo">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      <button type="submit" className="btn-primary">
        {task ? 'Update Task' : 'Add Task'}
      </button>
    </form>
  );
};

export default TaskForm;