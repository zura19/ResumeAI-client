import type { AiGeneratedResume } from "@/lib/types/AiGeneratedResume";
import type { ICreativeColors } from "..";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

interface props {
  data: AiGeneratedResume["skills"];
  colors: ICreativeColors;
}

export default function Skills({ data, colors }: props) {
  const styles = StyleSheet.create({
    container: {
      marginBottom: 10,
    },
    title: {
      fontSize: 15,
      fontWeight: "bold",
      fontFamily: "Helvetica-Bold",
      color: colors.text,
      marginBottom: 7,
      borderBottom: `2px solid ${colors.primary}`,
      paddingBottom: 4,
    },
    skillsGrid: {
      display: "flex",
      flexDirection: "row",
      gap: 7,
    },
    skillCategory: {
      flex: 1,
    },
    categoryTitle: {
      fontSize: 10,
      fontWeight: "bold",
      fontFamily: "Helvetica-Bold",
      color: colors.text,
      marginBottom: 5,
    },
    skillsContainer: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 4,
    },
    skillBadge: {
      borderRadius: 4,
      padding: "3px 6px",
      fontSize: 8,
    },
    softSkill: {
      backgroundColor: "#ec489a14",
      color: colors.accent,
    },
    languageSkill: {
      backgroundColor: "#06b5d41b",
      color: colors.primary,
    },
    techSkill: {
      backgroundColor: "#4b556318",
      color: colors.secondaryText,
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Skills</Text>
      <View style={styles.skillsGrid}>
        <View style={styles.skillCategory}>
          <Text style={styles.categoryTitle}>Soft Skills</Text>
          <View style={styles.skillsContainer}>
            {data.soft.map((skill, i) => (
              <Text key={i} style={[styles.skillBadge, styles.softSkill]}>
                {skill}
              </Text>
            ))}
          </View>
        </View>

        <View style={styles.skillCategory}>
          <Text style={styles.categoryTitle}>Languages</Text>
          <View style={styles.skillsContainer}>
            {data.languages.map((skill, i) => (
              <Text key={i} style={[styles.skillBadge, styles.languageSkill]}>
                {skill}
              </Text>
            ))}
          </View>
        </View>

        <View style={styles.skillCategory}>
          <Text style={styles.categoryTitle}>Technologies</Text>
          <View style={styles.skillsContainer}>
            {data.technical.map((skill, i) => (
              <Text key={i} style={[styles.skillBadge, styles.techSkill]}>
                {skill}
              </Text>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
}
