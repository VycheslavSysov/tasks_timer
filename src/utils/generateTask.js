const names = [
  'Погладить кота',
  'Написати тести',
  'Купити молока',
  'Фікс бага',
  'Подивитись футбол',
  'Документація',
  'Сходити на прогулянку',
];

export default function generateTask() {
  const duration = Math.floor(Math.random() * (3600 - 60 + 1)) + 60;
  const endTime = Date.now();
  const startTime = endTime - duration * 1000;
  const name = names[Math.floor(Math.random() * names.length)];

  return {
    id: Date.now(),
    name,
    startTime,
    endTime,
    duration,
  };
}