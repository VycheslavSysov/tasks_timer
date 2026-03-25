import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell
} from "recharts";
import formatTime from "@/utils/formatTime.js";

export default function TaskDetailsPage() {
  const {id} = useParams();
  const task = useSelector(state => state.tasks.find(t => t.id === Number(id)));
  const tasks = useSelector(state => state.tasks);

  if (!task) {
    return <div>Задачу не знайдено</div>;
  }

  return (
      <div>
        <p>Назва: {task.name}</p>
        <p>Початок: {new Date(task.startTime).toLocaleTimeString()}</p>
        <p>Кінець: {new Date(task.endTime).toLocaleTimeString()}</p>
        <p>Тривалість: {formatTime(task.duration)}</p>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={tasks}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="duration">
              {tasks.map((t) => (
                  <Cell
                      key={t.id}
                      fill={t.id === task.id ? "#f97316" : "#94a3b8"}
                  />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
  );
}