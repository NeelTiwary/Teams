// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TeamMaker from "./components/TeamMaker";
import SkillView from "./components/SkillView";
import DummyData from "../public/DummyData.ts";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TeamMaker teams={DummyData} />} />
        <Route path="/skills" element={<SkillView />} />
      </Routes>
    </Router>
  );
}

export default App;
