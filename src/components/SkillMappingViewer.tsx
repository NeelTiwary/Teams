// src/components/SkillMappingViewer.tsx
import * as React from "react";
import { useLocation } from "react-router-dom";

const SkillMappingViewer: React.FC = () => {
  const { search } = useLocation();
  const params = new URLSearchParams(search);

  const srcName = params.get("srcName");
  const srcId = params.get("srcId");
  const srcSkill = params.get("srcSkill");
  const targetName = params.get("targetName");
  const targetId = params.get("targetId");
  const targetSkill = params.get("targetSkill");

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Skill Mapping Viewer (Internal)</h2>
      <p><strong>Source:</strong> {srcName} (ID: {srcId})</p>
      <p><strong>Source Skill:</strong> {srcSkill}</p>
      <p><strong>Target:</strong> {targetName} (ID: {targetId})</p>
      <p><strong>Target Skill:</strong> {targetSkill}</p>
    </div>
  );
};

export default SkillMappingViewer;
