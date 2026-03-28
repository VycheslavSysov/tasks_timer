import {createSlice} from '@reduxjs/toolkit';

const initialState = () => {
  return {
    isRunning: localStorage.getItem('isRunning') === 'true',
    startTime: Number(localStorage.getItem('startTime')) || null,
  };
};

const timerSlice = createSlice({
  name: 'timer',
  initialState: initialState(),

  reducers: {
    startTimer: (state, action) => {
      state.startTime = action.payload;
      state.isRunning = true;
    },

    stopTimer: (state) => {
      state.startTime = null;
      state.isRunning = false;
      state.taskName = '';
      },

    setTaskName: (state, action) => {
      state.taskName = action.payload;
      },
  },
});

export const {startTimer, stopTimer, setTaskName} = timerSlice.actions;
export default timerSlice.reducer;


