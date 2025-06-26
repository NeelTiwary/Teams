// src/components/SkillView.tsx
import { useEffect, useState } from "react";
import { Box, Paper, Typography } from "@mui/material";

const SkillView = () => {
  const [content, setContent] = useState<{ skills: unknown[] }>({ skills: [] });

  useEffect(() => {
    const raw = localStorage.getItem("combinedContent");
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        setContent(parsed);
      } catch {
        setContent({ skills: [] });
      }
    }
  }, []);

  useEffect(() => {
    if (content.skills.length) {
      localStorage.setItem("combinedContent", JSON.stringify(content));
    }
  }, [content]);

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" fontWeight="bold">
        Skill Connections
      </Typography>
      <Paper sx={{ mt: 2, p: 2, bgcolor: "#e8f5e9", overflow: "auto", maxHeight: 600 }}>
        <pre style={{ margin: 0, fontSize: 12 }}>
          {JSON.stringify(content, null, 2)}
        </pre>
      </Paper>
    </Box>
  );
};

export default SkillView;
