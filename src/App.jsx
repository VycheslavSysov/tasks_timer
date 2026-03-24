import {Link, useLocation, Routes, Route} from "react-router-dom";
import {Tabs, Tab} from "@mui/material";
import TimerPage from "./pages/TimerPage";
import LogPage from "./pages/LogPage";
import NotFoundPage from "./pages/NotFoundPage";


function App() {
  const location = useLocation();

  return (
      <>
        <Tabs value={location.pathname}>
          <Tab label="Таймер" value="/" component={Link} to="/" />
          <Tab label="Лог" value="/log" component={Link} to="/log" />
        </Tabs>
        <Routes>
          <Route path="/" element={<TimerPage />} />
          <Route path="/log" element={<LogPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </>
  )
}

export default App;