import {useState, useEffect} from "react";
import formatTime from "../utils/formatTime.js";

function Timer() {
  const [taskName, setTaskName] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [tasks, setTasks] = useState([]);

  const handleStart = () => {
    setStartTime(Date.now());
    setIsRunning(true);
  }

  const handleStop = () => {
    if (!taskName) {
      alert('Введи назву задачі!')
      return;
    }
    const newTask = {
      id: Date.now(),
      name: taskName,
      startTime: startTime,
      endTime: Date.now(),
      duration: elapsedSeconds,
    }
    setTasks(previous => [...previous, newTask]);

    setElapsedSeconds(0);
    setTaskName('');
    setStartTime(null);
    setIsRunning(false);
  }

  useEffect(() => {
    if (!isRunning) {
      return;
    }
    const interval = setInterval(() => {
      setElapsedSeconds(previous => previous + 1)
    }, 1000);
    return () => clearInterval(interval)
  }, [isRunning])


  return (
      <div>
        <input
            value={taskName}
            onChange={event => setTaskName(event.target.value)}
        />
        <div>{formatTime(elapsedSeconds)}</div>

        <button onClick={isRunning ? handleStop : handleStart}>
          {isRunning ? 'STOP' : 'START'}
        </button>
      </div>
  );
}

export default Timer;