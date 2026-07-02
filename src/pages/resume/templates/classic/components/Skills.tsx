import type { AiGeneratedResume } from "@/lib/types/AiGeneratedResume";
import type { ClassicColors } from "..";
import { visibleSkillsCategories } from "../../utils";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

interface props {
  data: AiGeneratedResume["skills"];
  colors: ClassicColors;
}

export default function Skills({ data, colors }: props) {
  const visibleCategories = visibleSkillsCategories(
    data.soft,
    data.technical,
    data.languages,
  );

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

  if (visibleCategories.length === 0) {
    return null;
  }

  return (
    <View>
      <Text style={styles.title}>Technical Skills</Text>
      {visibleCategories.map((category) => (
        <View key={category.title} style={styles.skillRow}>
          <Text style={styles.label}>{category.title}:</Text>
          <Text style={styles.skillList}>{category.values.join(", ")}</Text>
        </View>
      ))}
    </View>
  );
}
