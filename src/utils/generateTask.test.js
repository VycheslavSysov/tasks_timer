import { expect, test } from '@jest/globals';
import generateTask from './generateTask';

test('generateTask returns a valid task object',() => {
  const task = generateTask();

  expect(task).toHaveProperty('id');
  expect(task).toHaveProperty('name');
  expect(task).toHaveProperty('startTime');
  expect(task).toHaveProperty('endTime');
  expect(task).toHaveProperty('duration');
});
