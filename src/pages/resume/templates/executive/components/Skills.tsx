import type { AiGeneratedResume } from "@/lib/types/AiGeneratedResume";
import type { ExecutiveColors } from "..";
import { visibleSkillsCategories } from "../../../utils/templateUtils";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

interface props {
  data: AiGeneratedResume["skills"];
  colors: ExecutiveColors;
}

export default function Skills({ data, colors }: props) {
  const visibleCategories = visibleSkillsCategories(
    data.soft,
    data.technical,
    data.languages,
  ).map((category) => ({
    ...category,
    title:
      category.title === "Technical Skills" ? "Technical" : category.title,
  }));

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
    skillsGrid: {
      display: "flex",
      flexDirection: "row",
      gap: 6,
    },
    skillCategory: {
      flex: 1,
    },
    categoryHeader: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      gap: 4,
      marginBottom: 4,
      paddingBottom: 4,
      borderBottom: `1px solid ${colors.accent}`,
    },
    categoryTitle: {
      fontSize: 10,
      fontWeight: "bold",
      fontFamily: "Helvetica-Bold",
      color: colors.text,
    },
    skillItem: {
      display: "flex",
      flexDirection: "row",
      alignItems: "flex-start",
      gap: 3,
      marginBottom: 2,
    },
    skillBullet: {
      color: colors.accent,
      fontWeight: "bold",
      fontFamily: "Helvetica-Bold",
      fontSize: 9,
      marginRight: 4,
      marginTop: 2,
    },
    skillText: {
      fontSize: 9,
      color: colors.textTertiary,
      flex: 1,
    },
  });

  if (visibleCategories.length === 0) {
    return null;
  }

  return (
    <View>
      <Text style={styles.title}>CORE COMPETENCIES</Text>
      <View style={styles.skillsGrid}>
        {visibleCategories.map((category) => (
          <View key={category.title} style={styles.skillCategory}>
            <View style={styles.categoryHeader}>
              <Text style={styles.categoryTitle}>{category.title}</Text>
            </View>
            {category.values.map((skill, i) => (
              <View key={i} style={styles.skillItem}>
                <Text style={styles.skillBullet}>-</Text>
                <Text style={styles.skillText}>{skill}</Text>
              </View>
            ))}
          </View>
        ))}
      </View>
    </View>
  );
}
