import type { AiGeneratedResume } from "@/lib/types/AiGeneratedResume";
import type { ICreativeColors } from "..";
import {
  formatEducationLine,
  formatTemplateDateRange,
} from "../../../utils/templateUtils";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

interface props {
  data: AiGeneratedResume["education"];
  colors: ICreativeColors;
}
export default function Education({ data, colors }: props) {
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
    educationItem: {
      marginBottom: 6,
      padding: 5,
      backgroundColor: "#06b5d418",
      borderRadius: 3,
    },
    degree: {
      fontSize: 10,
      fontWeight: "",
      fontFamily: "Helvetica-Bold",
      color: colors.text,
      marginBottom: 2,
    },
    university: {
      fontSize: 9,
      fontWeight: "semiBold",
      fontFamily: "Helvetica-Bold",
      color: colors.text,
      marginBottom: 2,
    },
    dates: {
      fontSize: 8,
      color: colors.secondaryText,
    },
  });

  return (
    <View wrap={false}>
      <Text style={styles.title}>Education</Text>
      {data.map((edu, index) => {
        const educationLine = formatEducationLine(edu.degree, edu.fieldOfStudy);

        return (
          <View key={index} style={styles.educationItem}>
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
        );
      })}
    </View>
  );
}
