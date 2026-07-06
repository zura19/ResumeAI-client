import type { AiGeneratedResume } from "@/lib/types/AiGeneratedResume";
import type { ExecutiveColors } from "..";
import {
  formatEducationLine,
  formatTemplateDateRange,
} from "../../../utils/templateUtils";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

interface props {
  data: AiGeneratedResume["education"];
  colors: ExecutiveColors;
}

export default function Education({ data, colors }: props) {
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
    educationItem: {
      marginBottom: 4,
      display: "flex",
      flexDirection: "row",
      gap: 5,
    },
    iconCircle: {
      width: 18,
      height: 18,
      backgroundColor: colors.accent,
      borderRadius: 9,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    icon: {
      fontSize: 12,
      color: colors.white,
    },
    content: {
      flex: 1,
    },
    degree: {
      fontSize: 10,
      fontWeight: "bold",
      fontFamily: "Helvetica-Bold",
      color: colors.text,
      marginBottom: 2,
    },
    university: {
      fontSize: 9,
      color: colors.textTertiary,
      marginBottom: 2,
    },
    dates: {
      fontSize: 8,
      color: colors.textLight,
    },
  });

  return (
    <View wrap={false}>
      <Text style={styles.title}>EDUCATION</Text>
      {data.map((edu, index) => {
        const educationLine = formatEducationLine(edu.degree, edu.fieldOfStudy);

        return (
          <View key={index} style={styles.educationItem}>
            <View style={styles.iconCircle}>
              {/* <Text style={styles.icon}>Education</Text> */}
            </View>
            <View style={styles.content}>
              {educationLine ? (
                <Text style={styles.degree}>{educationLine}</Text>
              ) : null}
              <Text style={styles.university}>{edu.university}</Text>
              <Text style={styles.dates}>
                {formatTemplateDateRange(
                  edu.startDate,
                  edu.stillStudying ? "Present" : edu.endDate,
                )}
              </Text>
            </View>
          </View>
        );
      })}
    </View>
  );
}
