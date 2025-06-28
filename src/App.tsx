import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TeamMaker from "./components/TeamMaker";
import DummyData from "../public/DummyData.ts";
import SkillView from "./components/SkillMappingViewer.tsx";
import type { Team } from "./types/interfaces.ts";

function App() {
  return (
    <Router>
      <Routes>
        {/* Default route to TeamMaker */}
        <Route path="/" element={<TeamMaker teams={DummyData as Team[]} />} />
        {/* Skill mapping viewer route */}
        <Route path="/skill-mapping-viewer" element={<SkillView />} />
      </Routes>
    </Router>
  );
}

export default App;
