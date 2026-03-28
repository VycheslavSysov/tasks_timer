import generateTask from './generateTask';

test( () => {
  const task = generateTask();

  expect(task).toHaveProperty('id');
  expect(task).toHaveProperty('name');
  expect(task).toHaveProperty('startTime');
  expect(task).toHaveProperty('endTime');
  expect(task).toHaveProperty('duration');
});