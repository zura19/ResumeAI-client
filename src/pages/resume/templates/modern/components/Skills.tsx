import type { AiGeneratedResume } from "@/lib/types/AiGeneratedResume";
import type { ModernColors } from "..";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

interface props {
  data: AiGeneratedResume["skills"];
  colors: ModernColors;
}

export default function Skills({ data, colors }: props) {
  const styles = StyleSheet.create({
    container: {
      marginBottom: 12,
    },
    title: {
      fontSize: 13,
      fontWeight: "bold",
      fontFamily: "Helvetica-Bold",
      color: colors.text,
      marginBottom: 7,
      textTransform: "uppercase",
      letterSpacing: 1,
    },
    category: {
      marginBottom: 7,
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
      gap: 5,
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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SKILLS</Text>

      <View style={styles.category}>
        <Text style={styles.categoryTitle}>Technical Skills</Text>
        <View style={styles.skillsContainer}>
          {data.technical.map((skill, index) => (
            <Text key={index} style={styles.skillBadge}>
              {skill}
            </Text>
          ))}
        </View>
      </View>

      <View style={styles.category}>
        <Text style={styles.categoryTitle}>Soft Skills</Text>
        <View style={styles.skillsContainer}>
          {data.soft.map((skill, index) => (
            <Text key={index} style={styles.skillBadge}>
              {skill}
            </Text>
          ))}
        </View>
      </View>

      <View style={styles.category}>
        <Text style={styles.categoryTitle}>Languages</Text>
        <View style={styles.skillsContainer}>
          {data.languages.map((lang, index) => (
            <Text key={index} style={styles.skillBadge}>
              {lang}
            </Text>
          ))}
        </View>
      </View>
    </View>
  );
}
