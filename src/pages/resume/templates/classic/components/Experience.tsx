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
      color: colors.black,
      paddingBottom: 4,
      marginBottom: 4,
      borderBottom: `1.5px solid ${colors.black}`,
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
      color: colors.black,
    },
    dates: {
      fontSize: 9,
      color: colors.black,
    },
    position: {
      fontSize: 9,
      fontFamily: "Times-Italic",
      color: colors.black,
      marginBottom: 4,
    },
    responsibility: {
      fontSize: 9,
      color: colors.black,
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
      backgroundColor: colors.black,
      marginRight: 3,
      marginTop: 2,
    },
  });

  return (
    <View>
      <Text style={styles.title}>Experience</Text>
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
