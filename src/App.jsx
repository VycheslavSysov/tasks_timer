import {useLocation, Routes, Route, useNavigate, Navigate} from "react-router-dom";
import {Tabs, TabsList, TabsTrigger} from "@/components/ui/tabs.jsx";
import TaskDetailsPage from "./pages/TaskDetailsPage";
import Timer from "./components/Timer";
import TimerPage from "./pages/TimerPage";
import LogPage from "./pages/LogPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
      <div className="mx-auto max-w-5xl px-6 pb-12">
        <div className="pt-10">
          <Timer />
        </div>
        <Tabs
            value={location.pathname} onValueChange={(value) => navigate(value)}
        >
          <TabsList
              className="mt-6 h-12 w-full rounded-none bg-cyan-500 p-0 gap-0"
          >
            <TabsTrigger
                value="/log"
                className="flex-1 rounded-none text-white uppercase font-semibold tracking-wide border-0 data-[state=active]:bg-cyan-500 data-[state=active]:text-white data-[state=active]:border-b-2 data-[state=active]:border-rose-400"
            >
              TASKS LOG
            </TabsTrigger>
            <TabsTrigger
                value="/log/chart"
                className="flex-1 rounded-none text-white uppercase font-semibold tracking-wide border-0 data-[state=active]:bg-cyan-500 data-[state=active]:text-white data-[state=active]:border-b-2 data-[state=active]:border-rose-400"
            >
              TASKS CHART
            </TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="pt-8 -mt-6">
          <Routes>
            <Route path="/" element={<Navigate to="/log" replace />} />
            <Route path="/log" element={<LogPage />} />
            <Route path="/log/chart" element={<LogPage />} />
            <Route path="/tasks/:id" element={<TaskDetailsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </div>
  )
}

export default App;