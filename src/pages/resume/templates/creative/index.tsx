import type { AiGeneratedResume } from "@/lib/types/AiGeneratedResume";
import { Document, Page, View, StyleSheet } from "@react-pdf/renderer";
import Summary from "./components/Summary";
import PersonalInfo from "./components/PersonalInfo";
import { Experience } from "./components/Experience";
import Projects from "./components/Projects";
import Education from "./components/Education";
import Skills from "./components/Skills";

interface props {
  resumeData: AiGeneratedResume;
}

export interface ICreativeColors {
  primary: string;
  accent: string;
  background: string;
  text: string;
  secondaryText: string;
}

export default function ResumeCreative({ resumeData }: props) {
  const colors = {
    primary: "#06b6d4",
    accent: "#ec4899",
    background: "#ffffff",
    text: "#111827",
    secondaryText: "#4b5563",
  };

  const styles = StyleSheet.create({
    page: {
      backgroundColor: colors.background,
      fontFamily: "Helvetica",
      display: "flex",
      flexDirection: "column",
      gap: 6,
    },
    content: {
      padding: 16,
      display: "flex",
      flexDirection: "column",
      gap: 8,
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
