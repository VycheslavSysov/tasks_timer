export default function groupTasksByHour(tasks) {
  const hours = Array.from({length: 24}, (_, i) => ({hour: i, minutes: 0}));

  tasks.forEach(task => {
    let cursor = task.startTime;

    while (cursor < task.endTime) {
      const hour = new Date(cursor).getHours();
      const hourEnd = new Date(cursor);
      hourEnd.setHours(hour + 1, 0, 0, 0);

      const segmentEnd = Math.min(hourEnd.getTime(), task.endTime);
      const minutes = Math.round((segmentEnd - cursor) / 1000 / 60);

      hours[hour].minutes += minutes;
      cursor = segmentEnd;
    }
  });

  return hours;
}