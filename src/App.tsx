import TeamMaker from "./components/TeamMaker";
import DummyData from "../public/DummyData.ts";
import type { Team } from "./types/interfaces.ts";


function App() {
  return (
    <div className="App">
      <TeamMaker teams={DummyData as Team[]} />
    </div>
  );
}

export default App;
