import type { AiGeneratedResume } from "@/lib/types/AiGeneratedResume";
import type { ICreativeColors } from "..";
import { formatTemplateDateRange } from "../../utils";
import { StyleSheet } from "@react-pdf/renderer";
import { Text, View } from "@react-pdf/renderer";

interface props {
  data: AiGeneratedResume["experience"];
  colors: ICreativeColors;
}

export function Experience({ data, colors }: props) {
  const styles = StyleSheet.create({
    title: {
      fontSize: 12,
      fontWeight: "bold",
      fontFamily: "Helvetica-Bold",
      color: colors.text,
      marginBottom: 8,
      borderBottom: `1.5px solid ${colors.primary}`,
      paddingBottom: 4,
    },
    experienceItem: {
      marginBottom: 6,
      paddingLeft: 6,
      borderLeft: `2px solid ${colors.accent}`,
      position: "relative",
    },
    position: {
      fontSize: 11,
      fontWeight: "bold",
      fontFamily: "Helvetica-Bold",
      color: colors.text,
      marginBottom: 2,
    },
    company: {
      fontSize: 9,
      color: colors.primary,
      fontWeight: "bold",
      fontFamily: "Helvetica-Bold",
    },
    dates: {
      fontSize: 8,
      color: colors.secondaryText,
      marginTop: 1,
      marginBottom: 3,
    },
    responsibility: {
      fontSize: 9,
      color: colors.secondaryText,
      marginBottom: 2,
      paddingLeft: 0,
    },
  });

  return (
    <View>
      <Text style={styles.title}>Experience</Text>
      {data.map((exp, index) => (
        <View key={index} style={styles.experienceItem}>
          <Text style={styles.position}>{exp.position}</Text>
          <Text style={styles.company}>{exp.company}</Text>
          <Text style={styles.dates}>
            {formatTemplateDateRange(exp.startDate, exp.endDate)}
          </Text>
          {exp.responsibilities.map((item, i) => (
            <Text key={i} style={styles.responsibility}>
              • {item}
            </Text>
          ))}
        </View>
      ))}
    </View>
  );
}
