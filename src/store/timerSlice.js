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
      },
  },
});

export const {startTimer, stopTimer} = timerSlice.actions;
export default timerSlice.reducer;


