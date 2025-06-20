// Define a type for team data
export interface Team {
  teamId: string;
  srcId: string;
  srcName: string;
  targetId: string;
  targetName: string;
}

// Array of team data
const DummyData: Team[] = [
  { teamId: "team01", srcId: "101", srcName: "Neelmani", targetId: "102", targetName: "Raj" },
  { teamId: "team02", srcId: "101", srcName: "Neelmani", targetId: "202", targetName: "Shankan" },
  { teamId: "team03", srcId: "301", srcName: "Mayank", targetId: "302", targetName: "Rohit" },
];

export default DummyData;
