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
        <Tabs
            value={location.pathname} onValueChange={(value) => navigate(value)}
        >
          <TabsList>
            <TabsTrigger value="/">Таймер</TabsTrigger>
            <TabsTrigger value="/log">Лог</TabsTrigger>
          </TabsList>
        </Tabs>
        <Routes>
          <Route path="/" element={<TimerPage />} />
          <Route path="/log" element={<LogPage />} />
          <Route path="/tasks/:id" element={<TaskDetailsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </>
  )
}

export default App;