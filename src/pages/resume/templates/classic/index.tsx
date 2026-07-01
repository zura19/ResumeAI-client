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
}

const colors: ClassicColors = {
  black: "#000000",
  white: "#ffffff",
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
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <PersonalInfo colors={colors} data={resumeData.personalInfo} />
        <Summary colors={colors} text={resumeData.summary} />
        <Skills colors={colors} data={resumeData.skills} />
        <Experience colors={colors} data={resumeData.experience} />
        <Projects colors={colors} data={resumeData.projects} />
        <Education colors={colors} data={resumeData.education} />
      </Page>
    </Document>
  );
}
