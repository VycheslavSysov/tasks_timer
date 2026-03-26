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
import {addTask, clearTasks} from "@/store/tasksSlice.js";
import generateTask from "@/utils/generateTask.js";
import groupTasksByHour from "@/utils/groupTasksByHour.js";
import {Tabs, TabsList, TabsTrigger} from "@/components/ui/tabs.jsx";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";


export default function LogPage() {
  const tasks = useSelector(state => state.tasks);
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
        <Tabs
            value={location.pathname} onValueChange={(value) => navigate(value)}
        >
          <TabsList>
            <TabsTrigger value="/log">TASKS LOG</TabsTrigger>
            <TabsTrigger value="/log/chart">TASKS CHART</TabsTrigger>
          </TabsList>
        </Tabs>

        {location.pathname === "/log" && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>#</TableHead>
                  <TableHead>Назва</TableHead>
                  <TableHead>Початок</TableHead>
                  <TableHead>Кінець</TableHead>
                  <TableHead>Тривалість</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tasks.map((task, index) => (
                    <TableRow
                        key={task.id}
                        onClick={() => navigate(`/tasks/${task.id}`)}
                    >
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{task.name}</TableCell>
                      <TableCell>{new Date(task.startTime).toLocaleTimeString()}</TableCell>
                      <TableCell>{new Date(task.endTime).toLocaleTimeString()}</TableCell>
                      <TableCell>{formatTime(task.duration)}</TableCell>
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
            <Bar dataKey="minutes" fill="#94a3b8" />
          </BarChart>
        </ResponsiveContainer>
      )}

        <div style={{textAlign: 'right', marginTop: '16px'}}>
          <button onClick={handleGenerate}>GENERATE</button>
        </div>
      </div>
  );
}