import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task } from './types';

// Create a slice for managing tasks
const tasksSlice = createSlice({
  name: 'tasks',
  initialState: [] as Task[],
  reducers: {
    // Add a new task to the state
    addTask: (state, action: PayloadAction<Task>) => {
      state.push(action.payload);
    },
    // Update an existing task in the state
    updateTask: (state, action: PayloadAction<Task>) => {
      const index = state.findIndex(task => task.id === action.payload.id);
      if (index !== -1) state[index] = action.payload;
    },
    // Remove a task from the state
    deleteTask: (state, action: PayloadAction<string>) => {
      return state.filter(task => task.id !== action.payload);
    },
  },
});

// Export action creators
export const { addTask, updateTask, deleteTask } = tasksSlice.actions;

// Create and configure the Redux store
export const store = configureStore({
  reducer: {
    tasks: tasksSlice.reducer,
  },
});

// Export types for TypeScript support
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;