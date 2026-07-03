import { create } from "zustand";
import type {
  PersonalInfo,
  Resume,
  Education,
  Experience,
  skillType,
  Project,
} from "../types/buildResumeTypes";
import type { ResumeType } from "../types/AiGeneratedResume";
import { toast } from "sonner";

interface ResumeState {
  step: number;
  data: Resume;
}

interface ResumeActions {
  nextStep: () => void;
  prevStep: () => void;
  reset: () => void;

  handlePersonalInfo: (personalInfo: PersonalInfo) => void;
  handleAddEducation: (education: Education) => void;
  handleRemoveEducation: (index: number) => void;
  handleAddExperience: (experience: Experience) => void;
  handleRemoveExperience: (index: number) => void;
  handleAddSkill: (type: skillType, skill: string) => void;
  handleRemoveSkill: (type: skillType, skill: string) => void;
  handleUpdateSkill: (
    type: skillType,
    currentSkill: string,
    nextSkill: string,
  ) => void;
  handleAddProject: (project: Project) => void;
  handleRemoveProject: (index: number) => void;
  handleChangeType: (type: ResumeType) => void;
}

export type ResumeStore = ResumeState & ResumeActions;

const useBuildResume = create<ResumeStore>((set, get) => ({
  step: 1,
  data: {
    personalInfo: {
      fullName: "",
      email: "",
      phone: "",
      address: "",
    },
    education: [],
    experience: [],
    skills: {
      soft: [],
      languages: [],
      technical: [],
    },
    projects: [],
    type: "modern",
  },
  nextStep: () => set((state) => ({ step: state.step + 1 })),
  prevStep: () =>
    set((state) => ({ step: state.step === 1 ? 1 : state.step - 1 })),
  reset: () =>
    set({
      step: 1,
      data: {
        personalInfo: {
          fullName: "",
          email: "",
          phone: "",
          address: "",
        },
        education: [],
        experience: [],
        skills: {
          soft: [],
          languages: [],
          technical: [],
        },
        projects: [],
        type: "modern",
      },
    }),

  handlePersonalInfo: (personalInfo: PersonalInfo) => {
    const state = get().data;
    return set({ data: { ...state, personalInfo } });
  },

  handleAddEducation: (education: Education) => {
    const state = get().data;
    return set({
      data: { ...state, education: [...state.education, education] },
    });
  },

  handleRemoveEducation: (index: number) => {
    const state = get().data;
    set({
      data: {
        ...state,
        education: state.education.filter((_, itemIndex) => itemIndex !== index),
      },
    });
  },

  handleAddExperience: (experience: Experience) => {
    const state = get().data;
    set({ data: { ...state, experience: [...state.experience, experience] } });
  },

  handleRemoveExperience: (index: number) => {
    const state = get().data;
    set({
      data: {
        ...state,
        experience: state.experience.filter(
          (_, itemIndex) => itemIndex !== index,
        ),
      },
    });
  },

  handleAddSkill: (type: skillType, skill: string) => {
    const state = get().data;

    if (state.skills[type].includes(skill)) {
      toast.error("Skill already added");
      return;
    }

    set({
      data: {
        ...state,
        skills: {
          ...state.skills,
          [type]: [...state.skills[type], skill],
        },
      },
    });
  },

  handleRemoveSkill: (type: skillType, skill: string) => {
    const state = get().data;
    set({
      data: {
        ...state,
        skills: {
          ...state.skills,
          [type]: state.skills[type].filter((s) => s !== skill),
        },
      },
    });
  },

  handleUpdateSkill: (
    type: skillType,
    currentSkill: string,
    nextSkill: string,
  ) => {
    const trimmedSkill = nextSkill.trim();
    const state = get().data;

    // if (!trimmedSkill) {
    //   toast.error("Skill cannot be empty");
    //   return;
    // }

    // if (
    //   trimmedSkill !== currentSkill &&
    //   state.skills[type].includes(trimmedSkill)
    // ) {
    //   toast.error("Skill already added");
    //   return;
    // }

    set({
      data: {
        ...state,
        skills: {
          ...state.skills,
          [type]: state.skills[type].map((skill) =>
            skill === currentSkill ? trimmedSkill : skill,
          ),
        },
      },
    });
  },

  handleAddProject: (project: Project) => {
    const state = get().data;
    set({ data: { ...state, projects: [...state.projects, project] } });
  },

  handleRemoveProject: (index: number) => {
    const state = get().data;
    set({
      data: {
        ...state,
        projects: state.projects.filter((_, itemIndex) => itemIndex !== index),
      },
    });
  },

  handleChangeType: (type: ResumeType) => {
    const state = get().data;
    set({ data: { ...state, type } });
  },
}));

export default useBuildResume;
