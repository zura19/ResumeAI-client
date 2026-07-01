import { Document, Page, StyleSheet } from "@react-pdf/renderer";

import PersonalInfo from "./components/PersonalInfo";
import Summary from "./components/Summary";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Education from "./components/Education";
import Skills from "./components/Skills";
import type { AiGeneratedResume } from "@/lib/types/AiGeneratedResume";

export interface ClassicColors {
  black: string;
  white: string;
  text: string;
  rule: string;
}

const colors: ClassicColors = {
  black: "#000000",
  white: "#ffffff",
  text: "#000000",
  rule: "#000000",
};

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.white,
    fontFamily: "Times-Roman",
    padding: 22,
    display: "flex",
    flexDirection: "column",
    gap: 6,
  },
});

interface props {
  resumeData: AiGeneratedResume;
}

export default function ResumeClassic({ resumeData }: props) {
  const hasPersonalInfo = Object.values(resumeData.personalInfo).some((value) =>
    value.trim()
  );
  const hasSummary = resumeData.summary.trim().length > 0;
  const hasSkills =
    resumeData.skills.soft.length > 0 ||
    resumeData.skills.technical.length > 0 ||
    resumeData.skills.languages.length > 0;
  const hasExperience = resumeData.experience.length > 0;
  const hasProjects = resumeData.projects.length > 0;
  const hasEducation = resumeData.education.length > 0;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {hasPersonalInfo && (
          <PersonalInfo colors={colors} data={resumeData.personalInfo} />
        )}
        {hasSummary && <Summary colors={colors} text={resumeData.summary} />}
        {hasSkills && <Skills colors={colors} data={resumeData.skills} />}
        {hasExperience && (
          <Experience colors={colors} data={resumeData.experience} />
        )}
        {hasProjects && <Projects colors={colors} data={resumeData.projects} />}
        {hasEducation && (
          <Education colors={colors} data={resumeData.education} />
        )}
      </Page>
    </Document>
  );
}
