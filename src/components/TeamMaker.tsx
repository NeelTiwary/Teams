import { useState, useEffect } from "react";
import FileHandler from "./FileHandler";
import {
  Container,
  Typography,
  FormGroup,
  Box,
  Checkbox,
  TextField,
  Divider,
  Grid,
} from "@mui/material";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import { grey } from "@mui/material/colors";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import type {
  Skill,
  MemberSkills,
  AllSkills,
  TeamMakerProps,
} from "../types/interfaces";

const filter = createFilterOptions<Skill | { inputValue: string }>();

const TeamMaker: React.FC<TeamMakerProps> = ({ teams }) => {
  const [memberSkills, setMemberSkills] = useState<MemberSkills>({});
  const [allSkills, setAllSkills] = useState<AllSkills>({});

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/ankmay0/teamManager1/main/my-react-app/public/SkillsData.json"
    )
      .then((res) => res.json())
      .then((data: Skill[]) => {
        const grouped: AllSkills = {};
        data.forEach((skill) => {
          if (skill.employeeId) {
            if (!grouped[skill.employeeId]) grouped[skill.employeeId] = [];
            grouped[skill.employeeId].push(skill);
          }
        });
        setAllSkills(grouped);
      });
  }, []);

  const toggleCheckbox = (teamId: string) => {
    setMemberSkills((prev) => {
      const existing = prev[teamId] || { checked: false };
      return {
        ...prev,
        [teamId]: { ...existing, checked: !existing.checked },
      };
    });
  };

  const updateExpertise = (
    teamId: string,
    memberId: string,
    expertise: string
  ) => {
    setMemberSkills((prev) => {
      const team = prev[teamId] || { checked: true };
      return {
        ...prev,
        [teamId]: {
          ...team,
          [memberId]: expertise,
        },
      };
    });
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
        mt: 4,
        mb: 4,
        border: 1,
        borderColor: grey[400],
        borderRadius: 2,
      }}
    >
      <Typography
        variant="h3"
        fontWeight="bold"
        gutterBottom
        sx={{ mt: 7, mb: 4, textAlign: "center" }}
      >
        Team Skill Assignment
      </Typography>

      {teams?.length ? (
        <FormGroup>
          {teams.map((team) => {
            const members = [
              { id: team.srcId, name: team.srcName },
              { id: team.targetId, name: team.targetName },
            ];

            return (
              <Box key={team.teamId} sx={{ py: 3 }}>
                <Grid container spacing={2} alignItems="center">
                  <Checkbox
                    checked={memberSkills?.[team.teamId]?.checked || false}
                    onChange={() => toggleCheckbox(team.teamId)}
                  />

                  {members.map((member, index) => (
                    <Grid key={member.id}>
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <Typography
                          variant="h6"
                          sx={{ minWidth: 100, fontWeight: "bold" }}
                        >
                          {member.name}
                        </Typography>

                        <Autocomplete
                          disabled={!memberSkills?.[team.teamId]?.checked}
                          value={memberSkills?.[team.teamId]?.[member.id] || ""}
                          options={[
                            { expertise: "__header__", experience: "" },
                            ...(allSkills[member.id] || []).map((skill) => ({
                              expertise: skill.expertise,
                              experience: skill.experience,
                            })),
                          ]}
                          filterOptions={(options, params) => {
                            const filtered = filter(
                              options.filter(
                                (o) =>
                                  typeof o === "object" &&
                                  "expertise" in o &&
                                  o.expertise !== "__header__"
                              ),
                              params
                            );
                            const { inputValue } = params;
                            const isExisting = filtered.some(
                              (option) =>
                                typeof option === "object" &&
                                "expertise" in option &&
                                option.expertise
                                  .toLowerCase()
                                  .trim() === inputValue.toLowerCase().trim()
                            );
                            if (inputValue !== "" && !isExisting) {
                              filtered.push({
                                inputValue,
                                expertise: `Add "${inputValue}"`,
                              });
                            }
                            return [
                              { expertise: "__header__", experience: "" },
                              ...filtered,
                            ];
                          }}
                          isOptionEqualToValue={(option, value) =>
                            typeof option === "object" &&
                            "expertise" in option &&
                            option.expertise === value
                          }
                          getOptionLabel={(option) =>
                            typeof option === "string"
                              ? option
                              : "inputValue" in option
                              ? option.inputValue
                              : option.expertise
                          }
                          onChange={(_, val) => {
                            if (
                              !val ||
                              (typeof val === "object" &&
                                "expertise" in val &&
                                val.expertise === "__header__")
                            ) {
                              updateExpertise(team.teamId, member.id, "");
                              return;
                            }
                            const expertise =
                              typeof val === "string"
                                ? val
                                : "inputValue" in val
                                ? val.inputValue
                                : val.expertise;
                            updateExpertise(team.teamId, member.id, expertise);
                          }}
                          getOptionDisabled={(option) =>
                            typeof option === "object" &&
                            "expertise" in option &&
                            option.expertise === "__header__"
                          }
                          renderOption={(props, option) => {
                            if (
                              typeof option === "object" &&
                              "expertise" in option &&
                              option.expertise === "__header__"
                            ) {
                              return (
                                <li
                                  {...props}
                                  style={{
                                    pointerEvents: "none",
                                    fontWeight: "bold",
                                    opacity: 0.8,
                                  }}
                                >
                                  <Box
                                    sx={{
                                      display: "flex",
                                      justifyContent: "space-between",
                                      width: "100%",
                                      px: 1,
                                      py: 0.5,
                                      fontSize: 12,
                                      borderBottom: `1px solid ${grey[300]}`,
                                    }}
                                  >
                                    <span>Skill</span>
                                    <span>Experience</span>
                                  </Box>
                                </li>
                              );
                            }
                            return (
                              <li
                                {...props}
                                key={
                                  typeof option === "object" &&
                                  "expertise" in option
                                    ? option.expertise
                                    : ""
                                }
                              >
                                <Box
                                  sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    width: "100%",
                                    fontSize: 14,
                                  }}
                                >
                                  <span>
                                    {typeof option === "object" &&
                                    "expertise" in option
                                      ? option.expertise
                                      : ""}
                                  </span>
                                  <span>
                                    {typeof option === "object" &&
                                    "experience" in option
                                      ? option.experience || ""
                                      : ""}
                                  </span>
                                </Box>
                              </li>
                            );
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Select / Add Skill"
                              sx={{ minWidth: 270 }}
                            />
                          )}
                        />

                        {index === 0 && (
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center",
                              mx: 2,
                            }}
                          >
                            <Typography
                              variant="caption"
                              sx={{
                                fontSize: 12,
                                fontWeight: "bold",
                                mr: 0.5,
                                color: grey[700],
                              }}
                            >
                              Provided To
                            </Typography>
                            <ArrowCircleRightIcon sx={{ color: "#333" }} />
                          </Box>
                        )}
                      </Box>
                    </Grid>
                  ))}
                </Grid>
                <Divider sx={{ mt: 4 }} />
              </Box>
            );
          })}
        </FormGroup>
      ) : (
        <Typography sx={{ textAlign: "center", mt: 2 }}>
          No team data available.
        </Typography>
      )}

      <FileHandler selections={memberSkills} />
    </Container>
  );
};

export default TeamMaker;
