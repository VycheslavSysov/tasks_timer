import formatTime from "@/utils/formatTime.js";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell
} from "@/components/ui/table.jsx";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

export default function LogPage() {
  const tasks = useSelector(state => state.tasks);
  const navigate = useNavigate();

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
                <TableRow key={task.id} onClick={() => navigate(`/tasks/${task.id}`)}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{task.name}</TableCell>
                  <TableCell>{new Date(task.startTime).toLocaleTimeString()}</TableCell>
                  <TableCell>{new Date(task.endTime).toLocaleTimeString()}</TableCell>
                  <TableCell>{formatTime(task.duration)}</TableCell>
                </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
  );
}