import type { AiGeneratedResume } from "@/lib/types/AiGeneratedResume";
import type { ClassicColors } from "..";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

interface props {
  data: AiGeneratedResume["education"];
  colors: ClassicColors;
}

export default function Education({ data, colors }: props) {
  const styles = StyleSheet.create({
    title: {
      fontSize: 12,
      fontFamily: "Times-Bold",
      color: colors.text,
      paddingBottom: 4,
      marginBottom: 4,
      borderBottom: `1px solid ${colors.rule}`,
    },
    educationItem: {
      marginBottom: 4,
    },
    header: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 2,
    },
    university: {
      fontSize: 10,
      fontFamily: "Times-Bold",
      color: colors.text,
    },
    dates: {
      fontSize: 9,
      color: colors.text,
    },
    degree: {
      fontSize: 9,
      color: colors.text,
    },
  });

  return (
    <View wrap={false}>
      <Text style={styles.title}>Education</Text>
      {data.map((edu, index) => (
        <View key={index} style={styles.educationItem}>
          <View style={styles.header}>
            <Text style={styles.university}>{edu.university}</Text>
            <Text style={styles.dates}>
              {edu.startDate} - {edu.stillStudying ? "Present" : edu.endDate}
            </Text>
          </View>
          <Text style={styles.degree}>Degree: {edu.degree}</Text>
        </View>
      ))}
    </View>
  );
}
