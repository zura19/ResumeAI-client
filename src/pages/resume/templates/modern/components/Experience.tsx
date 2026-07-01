import type { AiGeneratedResume } from "@/lib/types/AiGeneratedResume";
import type { ModernColors } from "..";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

interface props {
  data: AiGeneratedResume["experience"];
  colors: ModernColors;
}

export default function Experience({ data, colors }: props) {
  const styles = StyleSheet.create({
    container: {
      marginBottom: 12,
    },
    title: {
      fontSize: 13,
      fontWeight: "bold",
      fontFamily: "Helvetica-Bold",
      color: colors.text,
      marginBottom: 7,
      textTransform: "uppercase",
      letterSpacing: 1,
    },
    experienceItem: {
      marginBottom: 9,
      paddingLeft: 8,
      borderLeft: `2px solid ${colors.primary}`,
    },
    header: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 6,
    },
    leftHeader: {
      flex: 1,
    },
    position: {
      fontSize: 10,
      fontWeight: "bold",
      fontFamily: "Helvetica-Bold",
      color: colors.text,
      marginBottom: 5,
    },
    company: {
      fontSize: 9,
      fontWeight: "bold",
      fontFamily: "Helvetica-Bold",
      color: colors.text,
    },
    dates: {
      fontSize: 9,
      color: colors.textTertiary,
      whiteSpace: "nowrap",
    },
    responsibility: {
      fontSize: 9,
      color: colors.text,
      marginBottom: 4,
      display: "flex",
      flexDirection: "row",
      lineHeight: 1.25,
    },
    bullet: {
      color: colors.primary,
      marginRight: 5,
      marginTop: 2,
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>WORK EXPERIENCE</Text>
      {data.map((exp, index) => (
        <View key={index} style={styles.experienceItem}>
          <View style={styles.header}>
            <View style={styles.leftHeader}>
              <Text style={styles.position}>{exp.position}</Text>
              <Text style={styles.company}>{exp.company}</Text>
            </View>
            <Text style={styles.dates}>
              {exp.startDate} - {exp.endDate || "Present"}
            </Text>
          </View>
          {exp.responsibilities.map((resp, idx) => (
            <View key={idx} style={styles.responsibility}>
              <Text style={styles.bullet}>•</Text>
              <Text style={{ flex: 1 }}>{resp}</Text>
            </View>
          ))}
        </View>
      ))}
    </View>
  );
}
