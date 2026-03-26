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
import {useNavigate} from "react-router-dom";
import {addTask, clearTasks} from "@/store/tasksSlice.js";
import generateTask from "@/utils/generateTask.js";

export default function LogPage() {
  const tasks = useSelector(state => state.tasks);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleGenerate = () => {
    dispatch(clearTasks());
    const count = Math.floor(Math.random() * 6) + 10;

    for (let i = 0; i < count; i++) {
      dispatch(addTask(generateTask(i)));
    }
  };

  return (
      <div>
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
                    key={task.id} onClick={() => navigate(`/tasks/${task.id}`)}
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
        <div style={{textAlign: 'right', marginTop: '16px'}}>
          <button onClick={handleGenerate}>GENERATE</button>
        </div>
      </div>
  );
}