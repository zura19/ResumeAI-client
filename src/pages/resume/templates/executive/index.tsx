import type { AiGeneratedResume } from "@/lib/types/AiGeneratedResume";
import { Document, Page, View, StyleSheet } from "@react-pdf/renderer";
import Summary from "./components/Summary";
import PersonalInfo from "./components/PersonalInfo";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Education from "./components/Education";
import Skills from "./components/Skills";

export interface ExecutiveColors {
  primary: string;
  accent: string;
  accentLight: string;
  backgroundLight: string;
  border: string;
  borderAccent: string;
  text: string;
  textSecondary: string;
  textTertiary: string;
  textLight: string;
  divider: string;
  white: string;
}

const colors: ExecutiveColors = {
  primary: "#0d9488", // Main teal
  accent: "#10b981", // Green accent
  accentLight: "#6ee7b7", // Light green
  backgroundLight: "#ecfdf5", // Very light green
  border: "#d1fae5", // Light border
  borderAccent: "#a7f3d0", // Medium border
  text: "#0f172a", // Very dark text
  textSecondary: "#334155", // Dark gray
  textTertiary: "#475569", // Medium gray
  textLight: "#64748b", // Light gray
  divider: "#cbd5e1", // Divider
  white: "#ffffff",
};

interface props {
  resumeData: AiGeneratedResume;
}

export default function ResumeExecutive({ resumeData }: props) {
  const styles = StyleSheet.create({
    page: {
      padding: 16,
      backgroundColor: colors.white,
      fontFamily: "Helvetica",
      display: "flex",
      flexDirection: "column",
      gap: 6,
    },
    content: {
      // padding: 16,
      display: "flex",
      flexDirection: "column",
      gap: 12,
    },
  });
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <PersonalInfo colors={colors} data={resumeData.personalInfo} />
        <View style={styles.content}>
          <Summary colors={colors} text={resumeData.summary} />
          <Skills colors={colors} data={resumeData.skills} />
          <Experience colors={colors} data={resumeData.experience} />
          <Projects colors={colors} data={resumeData.projects} />
          <Education colors={colors} data={resumeData.education} />
        </View>
      </Page>
    </Document>
  );
}
