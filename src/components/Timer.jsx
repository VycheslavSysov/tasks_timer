import {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {startTimer, stopTimer} from "../store/timerSlice.js";
import {addTask} from "../store/tasksSlice.js";
import formatTime from "../utils/formatTime.js";


function Timer() {
  const dispatch = useDispatch();
  const isRunning  = useSelector(state => state.timer.isRunning);
  const startTime = useSelector(state => state.timer.startTime);

  const [taskName, setTaskName] = useState('');
  const [elapsedSeconds, setElapsedSeconds] = useState(() => {
    if (!isRunning || startTime === null) return 0;
    return Math.floor((Date.now() - startTime) / 1000);
  });

  const handleStart = () => {
    const now = Date.now()
    dispatch(startTimer(now));
  }

  const handleStop = () => {
    if (!taskName) {
      alert('Введи назву задачі!')
      return;
    }
    dispatch(addTask({
      id: Date.now(),
      name: taskName,
      startTime: startTime,
      endTime: Date.now(),
      duration: elapsedSeconds,
    }));
    dispatch(stopTimer());
    setElapsedSeconds(0);
    setTaskName('');
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


return (
  <div className="flex flex-col items-center pt-10 gap-6">
    <input
        value={taskName}
        onChange={event => setTaskName(event.target.value)}
        placeholder="Name of your task"
        className="border-b border-gray-400 text-center text-blue-700 outline-none w-64 pb-1"
    />

    <div className="w-52 h-52 rounded-full border-4 border-gray-200 shadow-lg flex items-center justify-center">
      <span className="text-3xl font-mono text-blue-700">
        {formatTime(elapsedSeconds)}
      </span>
    </div>

    <button
        onClick={isRunning ? handleStop : handleStart}
        className="border border-gray-400 px-6 py-1 text-sm text-gray-600 hover:bg-gray-100 transition-colors"
    >
      {isRunning ? 'STOP' : 'START'}
    </button>
  </div>
);
}

export default Timer;