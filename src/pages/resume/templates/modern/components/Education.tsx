import type { AiGeneratedResume } from "@/lib/types/AiGeneratedResume";
import type { ModernColors } from "..";
import {
  formatEducationLine,
  formatTemplateDateRange,
} from "../../../utils/templateUtils";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

interface props {
  data: AiGeneratedResume["education"];
  colors: ModernColors;
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
    },
    educationItem: {
      marginBottom: 6,
      paddingLeft: 6,
      borderLeft: `2px solid ${colors.primary}`,
    },
    header: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 2,
    },
    leftHeader: {
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
      fontWeight: "bold",
      fontFamily: "Helvetica-Bold",
      color: colors.text,
      marginBottom: 2,
    },
    field: {
      fontSize: 9,
      color: colors.textTertiary,
    },
    dates: {
      fontSize: 9,
      color: colors.textTertiary,
      whiteSpace: "nowrap",
    },
  });

  return (
    <View wrap={false}>
      <Text style={styles.title}>EDUCATION</Text>
      {data.map((edu, index) => {
        const educationLine = formatEducationLine(edu.degree, edu.fieldOfStudy);

        return (
          <View key={index} style={styles.educationItem}>
            <View style={styles.header}>
              <View style={styles.leftHeader}>
                {educationLine ? (
                  <Text style={styles.degree}>{educationLine}</Text>
                ) : null}
                <Text style={styles.university}>{edu.university}</Text>
              </View>
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
