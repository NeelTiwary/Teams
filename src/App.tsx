import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TeamMaker from "./components/TeamMaker";
import DummyData from "../public/DummyData.ts";
import type { Team } from "./types/interfaces.ts";

function App() {
  return (
        <TeamMaker teams={DummyData as Team[]} />
  );
}

export default App;
