import type { AiGeneratedResume } from "@/lib/types/AiGeneratedResume";
import type { ClassicColors } from "..";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

interface props {
  data: AiGeneratedResume["skills"];
  colors: ClassicColors;
}

export default function Skills({ data, colors }: props) {
  const styles = StyleSheet.create({
    title: {
      fontSize: 12,
      fontWeight: "bold",
      // fontFamily: "ClassicSerif",
      color: colors.text,
      paddingBottom: 4,
      marginBottom: 4,
      borderBottom: `1px solid ${colors.rule}`,
    },
    skillRow: {
      display: "flex",
      flexDirection: "row",
      marginBottom: 2,
      gap: 2,
    },
    label: {
      fontSize: 9,
      // fontFamily: "ClassicSerif",
      fontWeight: "bold",
      color: colors.text,
      width: 78,
      flexShrink: 0,
    },
    skillList: {
      fontSize: 9,
      // fontFamily: "ClassicSerif",
      color: colors.text,
      flex: 1,
      lineHeight: 1.25,
    },
  });

  return (
    <View>
      <Text style={styles.title}>Technical Skills</Text>

      <View style={styles.skillRow}>
        <Text style={styles.label}>Soft Skills:</Text>
        <Text style={styles.skillList}>{data.soft.join(", ")}</Text>
      </View>

      <View style={styles.skillRow}>
        <Text style={styles.label}>Technologies:</Text>
        <Text style={styles.skillList}>{data.technical.join(", ")}</Text>
      </View>

      <View style={styles.skillRow}>
        <Text style={styles.label}>Languages:</Text>
        <Text style={styles.skillList}>{data.languages.join(", ")}</Text>
      </View>
    </View>
  );
}
