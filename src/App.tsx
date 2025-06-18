import React from "react";
import TeamMaker from "./components/TeamMaker";
import DummyData from "../public/DummyData.ts";

// Type definition for your team data
export interface Team {
  teamId: number;
  srcId: number;
  targetId: number;
  srcName: string;
  targetName: string;
}

function App() {
  return (
    <div className="App">
      <TeamMaker teams={DummyData as Team[]} />
    </div>
  );
}

export default App;
