import { configureStore} from "@reduxjs/toolkit";
import tasksReducer from "./tasksSlice";
import timerReducer from "./timerSlice";

const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    timer: timerReducer,
  },
});

export default store;