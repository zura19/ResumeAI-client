import type { AiGeneratedResume } from "@/lib/types/AiGeneratedResume";
import type { ClassicColors } from "..";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

interface props {
  data: AiGeneratedResume["experience"];
  colors: ClassicColors;
}

export default function Experience({ data, colors }: props) {
  const styles = StyleSheet.create({
    title: {
      fontSize: 12,
      fontFamily: "Times-Bold",
      color: colors.text,
      paddingBottom: 4,
      marginBottom: 4,
      borderBottom: `1px solid ${colors.rule}`,
    },
    experienceItem: {
      marginBottom: 4,
    },
    header: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 4,
    },
    company: {
      fontSize: 10,
      fontFamily: "Times-Bold",
      color: colors.text,
    },
    dates: {
      fontSize: 9,
      color: colors.text,
    },
    position: {
      fontSize: 9,
      fontFamily: "Times-Italic",
      color: colors.text,
      marginBottom: 4,
    },
    responsibility: {
      fontSize: 9,
      color: colors.text,
      marginBottom: 2,
      display: "flex",
      flexDirection: "row",
      alignItems: "flex-start",
      lineHeight: 1.25,
    },
    bullet: {
      width: 4,
      height: 4,
      borderRadius: 2,
      backgroundColor: colors.text,
      marginRight: 3,
      marginTop: 2,
    },
  });

  return (
    <View>
      <Text style={styles.title}>Work Experience</Text>
      {data.map((exp, index) => (
        <View key={index} style={styles.experienceItem}>
          <View style={styles.header}>
            <Text style={styles.company}>{exp.company}</Text>
            <Text style={styles.dates}>
              {exp.startDate} - {exp.endDate || "Present"}
            </Text>
          </View>
          <Text style={styles.position}>{exp.position}</Text>
          {exp.responsibilities.map((resp, idx) => (
            <View key={idx} style={styles.responsibility}>
              <View style={styles.bullet} />
              <Text style={{ flex: 1 }}>{resp}</Text>
            </View>
          ))}
        </View>
      ))}
    </View>
  );
}
