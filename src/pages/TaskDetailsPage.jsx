import {useParams, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import formatTime from "@/utils/formatTime.js";

export default function TaskDetailsPage() {
  const {id} = useParams();
  const navigate = useNavigate();
  const selectedTasks = useSelector(state => state.tasks);
  const tasks = Array.isArray(selectedTasks) ? selectedTasks : [];
  const task = tasks.find(t => t.id === Number(id));

  if (!task) {
    return <div>Задачу не знайдено</div>;
  }

  return (
      <div>
        <button onClick={() => navigate('/')}
          className="h-7 min-w-16 rounded-xs border border-slate-200 bg-white px-3 text-[11px] font-semibold text-blue-600 shadow-[0_1px_2px_rgba(0,0,0,0.12)] hover:bg-slate-50"
        >
          Back
        </button>
        <p>Назва: {task.name}</p>
        <p>Початок: {new Date(task.startTime).toLocaleTimeString()}</p>
        <p>Кінець: {new Date(task.endTime).toLocaleTimeString()}</p>
        <p>Тривалість: {formatTime(task.duration)}</p>
      </div>
  );
}
