import {useState, useEffect} from "react";
import formatTime from "../utils/formatTime.js";

function Timer() {
  const [taskName, setTaskName] = useState('');
  const [isRunning, setIsRunning] = useState(() => {
    return localStorage.getItem("isRunning") === "true";
  });
  const [startTime, setStartTime] = useState(() => {
    const saved = localStorage.getItem("startTime");
    if (saved === null) {
      return null
    }
    return Number(saved);
  });
  const [elapsedSeconds, setElapsedSeconds] = useState(() => {
    const savedStart = localStorage.getItem("startTime");
    const savedIsRunning = localStorage.getItem("isRunning");
    if (savedStart === null || savedIsRunning !== "true") {
      return 0;
    }
    return Math.floor((Date.now() - Number(savedStart)) / 1000)
  });
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    if (saved === null) {
      return [];
    }
    return JSON.parse(saved);
  });

  const handleStart = () => {
    const now = Date.now()
    setStartTime(now);
    setIsRunning(true);
    localStorage.setItem("startTime", now)
    localStorage.setItem("isRunning", "true");
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
    localStorage.removeItem("isRunning");
    localStorage.removeItem("startTime");
  }

  useEffect(() => {
    if (!isRunning) {
      return;
    }
    const interval = setInterval(() => {
      setElapsedSeconds(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);
    return () => clearInterval(interval)
  }, [isRunning, startTime]);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])


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
