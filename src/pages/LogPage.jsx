import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@mui/material';
import {useSelector} from "react-redux";

export default function LogPage() {
  const tasks = useSelector(state => state.tasks);

  return (
      <div>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Назва</TableCell>
              <TableCell>Початок</TableCell>
              <TableCell>Кінець</TableCell>
              <TableCell>Тривалість</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.map((task, index) => (
                <TableRow key={task.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{task.name}</TableCell>
                  <TableCell>{new Date(task.startTime).toLocaleTimeString()}</TableCell>
                  <TableCell>{new Date(task.endTime).toLocaleTimeString()}</TableCell>
                  <TableCell>{task.duration}</TableCell>
                </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
  );
}