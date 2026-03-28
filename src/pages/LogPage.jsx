import formatTime from "@/utils/formatTime.js";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell
} from "@/components/ui/table.jsx";
import {useDispatch, useSelector} from "react-redux";
import {useLocation, useNavigate} from "react-router-dom";
import {addTask, clearTasks, deleteTask} from "@/store/tasksSlice.js";
import generateTask from "@/utils/generateTask.js";
import groupTasksByHour from "@/utils/groupTasksByHour.js";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";


export default function LogPage() {
  const selectedTasks = useSelector(state => state.tasks);
  const tasks = Array.isArray(selectedTasks) ? selectedTasks : [];
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const handleGenerate = () => {
    dispatch(clearTasks());
    const count = Math.floor(Math.random() * 6) + 10;

    for (let i = 0; i < count; i++) {
      dispatch(addTask(generateTask(i)));
    }
  };
  const chartData = groupTasksByHour(tasks);

  return (
      <div>
        {location.pathname === "/log" && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>№</TableHead>
                  <TableHead>Task</TableHead>
                  <TableHead>Time start</TableHead>
                  <TableHead>Time end</TableHead>
                  <TableHead>Time spend</TableHead>
                  <TableHead>Info</TableHead>
                  <TableHead>Delete</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tasks.map((task, index) => (
                    <TableRow
                        key={task.id}
                    >
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{task.name}</TableCell>
                      <TableCell>{new Date(task.startTime).toLocaleTimeString()}</TableCell>
                      <TableCell>{new Date(task.endTime).toLocaleTimeString()}</TableCell>
                      <TableCell>{formatTime(task.duration)}</TableCell>
                      <TableCell>
                        <button
                            onClick={() => navigate(`/tasks/${task.id}`)}
                            className="h-7 min-w-16 rounded-xs border border-slate-200 bg-white px-3 text-[11px] font-semibold text-blue-600 shadow-[0_1px_2px_rgba(0,0,0,0.12)] hover:bg-slate-50"
                        >INFO
                        </button>
                      </TableCell>
                      <TableCell>
                        <button
                            onClick={() => dispatch(deleteTask(task.id))}
                            className="h-7 min-w-16 rounded-xs border border-slate-200 bg-white px-3 text-[11px] font-semibold text-blue-600 shadow-[0_1px_2px_rgba(0,0,0,0.12)] hover:bg-slate-50"
                        >DELETE
                        </button>
                      </TableCell>
                    </TableRow>
                ))}
              </TableBody>
            </Table>
        )}

        {location.pathname === '/log/chart' && (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <XAxis dataKey="hour" />
                <YAxis />
                <Tooltip />
                <Legend formatter={(value) => <span style={{ color: 'black' }}>{value}</span>} />
                <Bar dataKey="minutes" name="Minutes in this hours" fill="#2a78e8" />
              </BarChart>
            </ResponsiveContainer>
        )}

        {location.pathname === '/log/chart' && (
            <div style={{textAlign: 'right', marginTop: '16px'}}>
              <button
                  onClick={handleGenerate}
                  className="h-7 min-w-16 rounded-xs border border-slate-200 bg-white px-3 text-[11px] font-semibold text-blue-600 shadow-[0_1px_2px_rgba(0,0,0,0.12)] hover:bg-slate-50"
              >
                GENERATE
              </button>
            </div>
        )}
      </div>
  );
}
