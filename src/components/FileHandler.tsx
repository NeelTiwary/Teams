import React, { useState } from "react";
import * as yaml from "js-yaml";
//npm install --save-dev @types/js-yaml - type this in your terminal
import {
  Box,
  Button,
  Typography,
  Grid,
  ButtonGroup,
  Paper,
} from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import type {
  FileHandlerProps,
  SkillConnection,
  SkillMapping,
  UploadData,
  PreviewBlockProps,
} from "../types/interfaces";

// selections = (checkbox : true / false , 101 :<selected skill 1> ,102:<selected skill2>) 
const FileHandler: React.FC<FileHandlerProps> = ({ selections }) => {
  const [fileName, setFileName] = useState<string>("");
  const [rawContent, setRawContent] = useState<string>("");
  const [combinedContent, setCombinedContent] = useState<string>("");
  const [showContent, setShowContent] = useState<boolean>(false);
  const [uploadedData, setUploadedData] = useState<UploadData | null>(null);

  const generateConnections = () => {
    const existingMap: { [key: string]: SkillMapping } = {};

    // existing map = { "skills": [ { "name": "Frontend Middle", "connectedTo": [ { "name": "agsja", "developerId": "101" } ] } ] }

    if (uploadedData?.skills?.length) {
      uploadedData.skills.forEach((item) => {
        existingMap[item.name] = {
          name: item.name,
          connectedTo: [...item.connectedTo],
        };
      });
    }

    // Object.entries(selections || {}).filter(teamData.checked).forEach(([teamId, teamData]) => {
    Object.entries(selections || {}).forEach(([_, teamData]) => {
      if (!teamData.checked) return;

      const memberKeys = Object.keys(teamData).filter((k) => k !== "checked");
      if (memberKeys.length !== 2) return;

      // find src and target based on prefix
      const srcKey = memberKeys.find((key) => key.startsWith("0-"));
      const targetKey = memberKeys.find((key) => key.startsWith("1-"));

      if (!srcKey || !targetKey) return;

      const srcSkill = teamData[srcKey];
      const targetSkill = teamData[targetKey];

      if (!srcSkill || !targetSkill) return;

      const srcId = srcKey.split("-")[1];
      const targetId = targetKey.split("-")[1];

      // create mapping for target skill if not present
      if (!existingMap[targetSkill]) {
        existingMap[targetSkill] = {
          name: targetSkill,
          connectedTo: [],
        };
      }

      const connection: SkillConnection = {
        name: srcSkill,
        developerId: srcId,
      };

      const exists = existingMap[targetSkill].connectedTo.find(
        (c) =>
          c.name === connection.name && c.developerId === connection.developerId
      );

      if (!exists) {
        existingMap[targetSkill].connectedTo.push(connection);
      }
    });


    const mergedConnections = Object.values(existingMap);
    setCombinedContent(JSON.stringify({ skills: mergedConnections }, null, 2));
    localStorage.setItem("combinedContent", JSON.stringify({ skills: mergedConnections }));

  };

  const handleShowContent = () => {
    if (!showContent) generateConnections();
    setShowContent((prev) => !prev);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = event.target?.result as string;
        const extension = file.name.split(".").pop()?.toLowerCase();
        const parsed: UploadData =
          extension === "json"
            ? JSON.parse(content)
            : (yaml.load(content) as UploadData);

        setUploadedData(parsed);
        setRawContent(JSON.stringify(parsed, null, 2));
      } catch (err) {
        console.error(err);
        alert("Invalid file format.");
      }
    };

    reader.readAsText(file);
  };

  const handleDownload = (format: "json" | "yml") => {
    if (!combinedContent) return alert("Nothing to download");

    const blob =
      format === "json"
        ? new Blob([combinedContent], { type: "application/json" })
        : new Blob([yaml.dump(JSON.parse(combinedContent))], {
          type: "application/x-yaml",
        });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `updated-data.${format}`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const PreviewBlock: React.FC<PreviewBlockProps> = ({
    title,
    content,
    bg = "#f5f5f5",
  }) => (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" color="black">
        {title}
      </Typography>
      <Paper
        sx={{ mt: 1, p: 2, bgcolor: bg, overflow: "auto", maxHeight: 300 }}
      >
        <pre style={{ margin: 0, fontSize: 12 }}>{content}</pre>
      </Paper>
    </Box>
  );

  return (
    <Box sx={{ bgcolor: "white", p: 6, borderRadius: 2, width: "100%" }}>
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
      >
        <Grid>
          <Button
            component="label"
            variant="outlined"
            color="primary"
            startIcon={<UploadFileIcon />}
            size="large"
          >
            Choose File
            <input
              type="file"
              accept=".json,.yml,.yaml"
              hidden
              onChange={handleFileUpload}
            />
          </Button>
        </Grid>

        <Grid>
          <Button
            variant="contained"
            color={showContent ? "warning" : "success"}
            onClick={handleShowContent}
          >
            {showContent ? "Hide Content" : "Show Content"}
          </Button>
        </Grid>

        <Grid>
          <ButtonGroup variant="outlined">
            <Button onClick={() => handleDownload("json")}>Download JSON</Button>
            <Button onClick={() => handleDownload("yml")}>Download YAML</Button>
          </ButtonGroup>
        </Grid>
      </Grid>

      {fileName && (
        <Typography
          variant="body2"
          color="black"
          sx={{ mt: 2, textAlign: "center" }}
        >
          Uploaded: {fileName}
        </Typography>
      )}

      {showContent && (
        <>
          {rawContent && (
            <PreviewBlock title="Uploaded File Content" content={rawContent} />
          )}
          {combinedContent && (
            <PreviewBlock
              title="Skill Connections"
              content={combinedContent}
              bg="#e8f5e9"
            />
          )}
        </>
      )}
    </Box>
  );
};

export default FileHandler;