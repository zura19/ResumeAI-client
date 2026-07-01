import type { AiGeneratedResume } from "@/lib/types/AiGeneratedResume";
import { Document, Page, StyleSheet } from "@react-pdf/renderer";
import Summary from "./components/Summary";
import PersonalInfo from "./components/PersonalInfo";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Education from "./components/Education";
import Skills from "./components/Skills";

export interface ModernColors {
  primary: string;
  primaryLight: string;
  primaryBorder: string;
  background: string;
  border: string;
  text: string;
  textSecondary: string;
  textTertiary: string;
  white: string;
}

const colors: ModernColors = {
  primary: "#2c5f8d", // Blue accent
  primaryLight: "#2c608d1d", // Very light blue background
  primaryBorder: "#2c608d2f", // Light blue border
  background: "#f9fafb", // Light gray background
  border: "#e5e7eb", // Light border
  text: "#1a1a1a", // Very dark text
  textSecondary: "#6b7280", // Medium gray
  textTertiary: "#6d6d6d", // Dark gray
  white: "#ffffff",
};

interface props {
  resumeData: AiGeneratedResume;
}

export default function ResumeModern({ resumeData }: props) {
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

  const styles = StyleSheet.create({
    page: {
      backgroundColor: colors.background,
      fontFamily: "Helvetica",
      padding: 22,
      display: "flex",
      flexDirection: "column",
      gap: 12,
    },
  });
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
