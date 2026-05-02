import { HashRouter, Routes, Route } from "react-router-dom";
import Splash from "./screens/Splash";
import Connect from "./screens/Connect";
import Dashboard from "./screens/Dashboard";
import Harvest from "./screens/Harvest";
import Confirm from "./screens/Confirm";
import Wrapped from "./screens/Wrapped";
import Profile from "./screens/Profile";

function App() {
  return (
    <div className="app-shell flex flex-col">
      <HashRouter>
        <Routes>
          <Route path="/" element={<Splash />} />
          <Route path="/connect" element={<Connect />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/harvest" element={<Harvest />} />
          <Route path="/confirm" element={<Confirm />} />
          <Route path="/wrapped" element={<Wrapped />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
