import Timer from '../components/Timer';
import {useDispatch} from "react-redux";
import {addTask} from "@/store/tasksSlice.js";
import generateTask from "@/utils/generateTask.js";

export default function TimerPage() {
  const dispatch = useDispatch();

  return (
      <div>
        <Timer />
        <button onClick={() => dispatch(addTask(generateTask()))}>
          Згенерувати задачу
        </button>
      </div>

  );
}