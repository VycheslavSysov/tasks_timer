import { configureStore} from "@reduxjs/toolkit";
import tasksReducer from "./tasksSlice";
import timerReducer from "./timerSlice";
import localStorageMiddleware from "./localStorageMiddleware.js";

const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    timer: timerReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware),
});

export default store;