import TeamMaker from "./components/TeamMaker";
import DummyData from "../public/DummyData.ts";
import SkillView from "./components/SkillView";
import type { Team } from "./types/interfaces.ts";

function App() {
  const params = new URLSearchParams(window.location.search);
  const hasParams = params.has("srcName") && params.has("targetName");

  return (
    <div className="App">
      {hasParams ? <SkillView /> : <TeamMaker teams={DummyData as Team[]} />}
    </div>
  );
}

export default App;
