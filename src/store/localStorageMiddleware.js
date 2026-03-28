const localStorageMiddleware = store => next => action => {
  const result = next(action);
  const state = store.getState();

  if (action.type === 'timer/startTimer') {
    localStorage.setItem('isRunning', 'true');
    localStorage.setItem('startTime', state.timer.startTime);
  }
  if (action.type === 'timer/stopTimer') {
    localStorage.removeItem('isRunning');
    localStorage.removeItem('startTime');
  }
  if (action.type === 'tasks/addTask' ||
      action.type === 'tasks/deleteTask' ||
      action.type === 'tasks/clearTask') {
    localStorage.setItem('tasks', JSON.stringify(state.tasks));
  }
  return result;
};

export default localStorageMiddleware;