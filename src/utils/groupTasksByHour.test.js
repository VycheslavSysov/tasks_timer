import groupTasksByHour from './groupTasksByHour';

test(() => {
  const start = new Date('2026-03-26T10:15:00').getTime();
  const end = new Date('2026-03-26T10:45:00').getTime();

  const result = groupTasksByHour([{startTime: start, endTime: end}]);

  expect(result[10].minutes).toBe(30);
});

test(() => {
  const start = new Date('2026-03-26T10:30:00').getTime();
  const end = new Date('2026-03-26T11:15:00').getTime();

  const result = groupTasksByHour([{startTime: start, endTime: end}]);

  expect(result[10].minutes).toBe(30);
  expect(result[11].minutes).toBe(15);
});

test(() => {
  const start = new Date('2026-03-26T14:30:00').getTime();
  const end = new Date('2026-03-26T16:15:00').getTime();

  const result = groupTasksByHour([{startTime: start, endTime: end}]);

  expect(result[14].minutes).toBe(30);
  expect(result[15].minutes).toBe(60);
  expect(result[16].minutes).toBe(15);
});

test('порожній масив повертає 24 нульових години', () => {
  const result = groupTasksByHour([]);

  expect(result).toHaveLength(24);
  expect(result.every(h => h.minutes === 0)).toBe(true);
});