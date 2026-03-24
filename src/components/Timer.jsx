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