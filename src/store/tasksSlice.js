import {createSlice} from '@reduxjs/toolkit';

const initialState = () => {
    const saved = localStorage.getItem('tasks');
    return saved ? JSON.parse(saved) : [];
  };

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: initialState(),
  reducers: {
    addTask: (state, action) => {
      state.push(action.payload);
    },
    deleteTask: (state, action) => {
      return state.filter((task) => task.id !== action.payload);
    },
    clearTasks: (state) => {
      return [];
    }
  },
});

export const {addTask, deleteTask , clearTasks} = tasksSlice.actions;
export default tasksSlice.reducer;