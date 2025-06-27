import React from "react";
import { Container, Typography, Box } from "@mui/material";

const SkillView: React.FC = () => {
  const params = new URLSearchParams(window.location.search);

  const srcName = params.get("srcName");
  const srcId = params.get("srcId");
  const srcSkill = params.get("srcSkill");

  const targetName = params.get("targetName");
  const targetId = params.get("targetId");
  const targetSkill = params.get("targetSkill");

  if (!srcName || !targetName || !srcSkill || !targetSkill) return null;

  return (
    <Container maxWidth="sm" sx={{ mt: 10 }}>
      <Box sx={{ p: 4, border: "1px solid gray", borderRadius: 2 }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Skill Mapping
        </Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>
          <strong>{srcName}</strong> (ID: {srcId}) — <em>{srcSkill}</em>
        </Typography>
        <Typography variant="body1">
          → provided to →
        </Typography>
        <Typography variant="body1" sx={{ mt: 1 }}>
          <strong>{targetName}</strong> (ID: {targetId}) — <em>{targetSkill}</em>
        </Typography>
      </Box>
    </Container>
  );
};

export default SkillView;
