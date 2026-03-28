const names = [
  'Погладить кота',
  'Написати тести',
  'Купити молока',
  'Фікс бага',
  'Подивитись футбол',
  'Документація',
  'Сходити на прогулянку',
];

export default function generateTask(offset = 0) {
  const duration = Math.floor(Math.random() * (90 * 60 - 10 * 60 + 1)) + 10 * 60;
  const endTime = Date.now() + offset;
  const startTime = endTime - duration * 1000;
  const name = names[Math.floor(Math.random() * names.length)];

  return {
    id: Date.now() + offset,
    name,
    startTime,
    endTime,
    duration,
  };
}