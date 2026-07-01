import type { AiGeneratedResume } from "@/lib/types/AiGeneratedResume";
import type { ModernColors } from "..";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

interface props {
  data: AiGeneratedResume["projects"];
  colors: ModernColors;
}

export default function Projects({ data, colors }: props) {
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
    projectItem: {
      marginBottom: 9,
      paddingLeft: 8,
      borderLeft: `2px solid ${colors.primary}`,
    },
    projectTitle: {
      fontSize: 10,
      fontWeight: "bold",
      fontFamily: "Helvetica-Bold",
      color: colors.text,
      marginBottom: 6,
    },
    techSection: {
      marginBottom: 6,
    },
    techLabel: {
      fontSize: 8,
      color: colors.textTertiary,
      fontWeight: "bold",
      fontFamily: "Helvetica-Bold",
      marginBottom: 4,
    },
    techContainer: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 5,
    },
    techBadge: {
      backgroundColor: colors.primaryLight,
      color: colors.primary,
      borderRadius: 2,
      padding: "3px 6px",
      fontSize: 7,
      //   border: `1px solid b`,
    },
    feature: {
      fontSize: 9,
      color: colors.text,
      marginBottom: 4,
      display: "flex",
      flexDirection: "row",
      lineHeight: 1.25,
    },
    bullet: {
      color: colors.primary,
      marginRight: 5,
      marginTop: 2,
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>PROJECTS</Text>
      {data.map((project, index) => (
        <View key={index} style={styles.projectItem}>
          <Text style={styles.projectTitle}>{project.title}</Text>

          <View style={styles.techSection}>
            <Text style={styles.techLabel}>Technologies:</Text>
            <View style={styles.techContainer}>
              {project.technologies.map((tech, idx) => (
                <Text key={idx} style={styles.techBadge}>
                  {tech}
                </Text>
              ))}
            </View>
          </View>

          {project.features.map((feature, idx) => (
            <View key={idx} style={styles.feature}>
              <Text style={styles.bullet}>•</Text>
              <Text style={{ flex: 1 }}>{feature}</Text>
            </View>
          ))}
        </View>
      ))}
    </View>
  );
}
