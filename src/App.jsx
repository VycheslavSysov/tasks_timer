import {useLocation, Routes, Route, useNavigate} from "react-router-dom";
import {Tabs, TabsList, TabsTrigger} from "@/components/ui/tabs.jsx";
import TaskDetailsPage from "./pages/TaskDetailsPage";
import TimerPage from "./pages/TimerPage";
import LogPage from "./pages/LogPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
  <>
    <Tabs value={location.pathname} onValueChange={(value) => navigate(value)}>
      <TabsList className="w-full rounded-none bg-cyan-400 h-12">
        <TabsTrigger
            value="/"
            className="flex-1 text-white uppercase font-medium tracking-wide data-[state=active]:bg-cyan-500 data-[state=active]:text-white rounded-none"
        >
          TASKS LOG
        </TabsTrigger>
        <TabsTrigger
            value="/log"
            className="flex-1 text-white uppercase font-medium tracking-wide data-[state=active]:bg-cyan-500 data-[state=active]:text-white rounded-none"
        >
          TASKS CHART
        </TabsTrigger>
      </TabsList>
    </Tabs>
    <Routes>
      <Route path="/" element={<TimerPage />} />
      <Route path="/log" element={<LogPage />} />
      <Route path="/log/chart" element={<LogPage />} />
      <Route path="/tasks/:id" element={<TaskDetailsPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </>
)
}

export default App;