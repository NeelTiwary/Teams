// Team definitions
export interface Team {
  teamId: string;
  srcId: string;
  srcName: string;
  targetId: string;
  targetName: string;
}

// Skill definition
export interface Skill {
  id?: string;
  expertise: string;
  experience?: string;
  employeeId?: string;
}

// FileHandler props
export interface FileHandlerProps {
  selections: {
    [developerId: string]: {
      checked: boolean;
      [skillId: string]: any;
    };
  };
}

// Skill connection mapping for FileHandler
export interface SkillConnection {
  name: string;
  developerId: string;
}

export interface SkillMapping {
  name: string;
  connectedTo: SkillConnection[];
}

export interface UploadData {
  skills: SkillMapping[];
}

// TeamMaker props
export interface TeamMakerProps {
  teams: Team[];
}

// MemberSkills will hold the selected skills for each team order
export type MemberSkills = {
  [teamId: string]: {
    checked: boolean;
    [memberId: string]: any;
  };
};

// allSkills will hold all the skills for each team member with key as memberId
export type AllSkills = {
  [memberId: string]: Skill[];
};

// For Preview Block in FileHandler
export interface PreviewBlockProps {
  title: string;
  content: string;
  bg?: string;
}
