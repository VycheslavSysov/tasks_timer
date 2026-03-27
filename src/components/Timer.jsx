import {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {startTimer, stopTimer} from "../store/timerSlice.js";
import {addTask} from "../store/tasksSlice.js";
import formatTime from "../utils/formatTime.js";


function Timer() {
  const dispatch = useDispatch();
  const isRunning  = useSelector(state => state.timer.isRunning);
  const startTime = useSelector(state => state.timer.startTime);
  const [showModal, setShowModal] = useState(false);

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
      setShowModal(true);
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
        className="h-7 min-w-16 rounded-xs border border-slate-200 bg-white px-3 text-[11px] font-semibold text-blue-600 shadow-[0_1px_2px_rgba(0,0,0,0.12)] hover:bg-slate-50"
    >
      {isRunning ? 'STOP' : 'START'}
    </button>
    {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-8 w-120 max-w-[90vw]">
            <h2 className="text-xl font-semibold text-red-700 mb-3">
              Empty task name
            </h2>
            <p className="text-gray-600 mb-6">
              You are trying close your task without name, enter the title and try again!
            </p>
            <div className="flex justify-end">
              <button
                  onClick={() => setShowModal(false)}
                  className="text-cyan-500 font-semibold text-sm hover:text-cyan-600"
              >
                CLOSE
              </button>
            </div>
          </div>
        </div>
      )}
  </div>
);
}

export default Timer;