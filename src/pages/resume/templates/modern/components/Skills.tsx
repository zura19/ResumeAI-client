import type { AiGeneratedResume } from "@/lib/types/AiGeneratedResume";
import type { ModernColors } from "..";
import { visibleSkillsCategories } from "../../utils";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

interface props {
  data: AiGeneratedResume["skills"];
  colors: ModernColors;
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
      fontFamily: "Helvetica-Bold",
      color: colors.text,
      marginBottom: 8,
      textTransform: "uppercase",
      letterSpacing: 1,
    },
    category: {
      marginBottom: 6,
    },
    categoryTitle: {
      fontSize: 10,
      fontWeight: "bold",
      fontFamily: "Helvetica-Bold",
      color: colors.text,
      marginBottom: 4,
    },
    skillsContainer: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 3,
    },
    skillBadge: {
      backgroundColor: colors.background,
      color: colors.text,
      borderRadius: 2,
      padding: "3px 6px",
      fontSize: 8,
      border: `1px solid ${colors.border}`,
    },
  });

  if (visibleCategories.length === 0) {
    return null;
  }

  return (
    <View>
      <Text style={styles.title}>SKILLS</Text>
      {visibleCategories.map((category) => (
        <View key={category.title} style={styles.category}>
          <Text style={styles.categoryTitle}>{category.title}</Text>
          <View style={styles.skillsContainer}>
            {category.values.map((skill, index) => (
              <Text key={index} style={styles.skillBadge}>
                {skill}
              </Text>
            ))}
          </View>
        </View>
      ))}
    </View>
  );
}
