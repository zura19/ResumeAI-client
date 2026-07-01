import type { AiGeneratedResume } from "@/lib/types/AiGeneratedResume";
import type { ExecutiveColors } from "..";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

interface props {
  data: AiGeneratedResume["experience"];
  colors: ExecutiveColors;
}

export default function Experience({ data, colors }: props) {
  const styles = StyleSheet.create({
    title: {
      fontSize: 12,
      fontWeight: "bold",
      fontFamily: "Helvetica-Bold",
      color: colors.text,
      marginBottom: 8,
      textTransform: "uppercase",
      letterSpacing: 1,
      borderBottom: `2px solid ${colors.border}`,
      paddingBottom: 4,
    },
    experienceItem: {
      marginBottom: 4,
      paddingLeft: 6,
      borderLeft: `2px solid ${colors.border}`,
    },
    position: {
      fontSize: 11,
      fontWeight: "bold",
      fontFamily: "Helvetica-Bold",
      color: colors.text,
      marginBottom: 2,
    },
    companyLine: {
      fontSize: 9,
      color: colors.textSecondary,
      marginTop: 2,
      marginBottom: 2,
    },
    company: {
      fontWeight: "bold",
      fontFamily: "Helvetica-Bold",
    },
    dates: {
      fontSize: 8,
      color: colors.textLight,
      marginBottom: 4,
    },
    responsibility: {
      fontSize: 9,
      color: colors.textTertiary,
      marginBottom: 2,
      paddingLeft: 5,
      display: "flex",
      flexDirection: "row",
    },
    bullet: {
      color: colors.accent,
      fontWeight: "bold",
      fontFamily: "Helvetica-Bold",
      marginRight: 5,
    },
  });

  return (
    <View>
      <Text style={styles.title}>PROFESSIONAL EXPERIENCE</Text>
      {data.map((exp, index) => (
        <View key={index} style={styles.experienceItem}>
          <Text style={styles.position}>{exp.position}</Text>
          <Text style={styles.companyLine}>
            <Text style={styles.company}>{exp.company}</Text> | {exp.position}
          </Text>
          <Text style={styles.dates}>
            {exp.startDate} - {exp.endDate || "Present"}
          </Text>
          {exp.responsibilities.map((item, i) => (
            <View key={i} style={styles.responsibility}>
              <Text style={styles.bullet}>•</Text>
              <Text style={{ flex: 1 }}>{item}</Text>
            </View>
          ))}
        </View>
      ))}
    </View>
  );
}
