import type { AiGeneratedResume } from "@/lib/types/AiGeneratedResume";
import type { ExecutiveColors } from "..";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

interface props {
  data: AiGeneratedResume["projects"];
  colors: ExecutiveColors;
}

export default function Projects({ data, colors }: props) {
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
    projectItem: {
      marginBottom: 4,
      padding: 5,
      backgroundColor: colors.backgroundLight,
      border: `1px solid ${colors.border}`,
      borderRadius: 4,
    },
    projectHeader: {
      display: "flex",
      flexDirection: "row",
      gap: 4,
      // marginBottom: 12,
    },
    projectTitle: {
      fontSize: 11,
      fontWeight: "bold",
      fontFamily: "Helvetica-Bold",
      color: colors.text,
    },
    section: {
      marginTop: 4,
      paddingTop: 4,
      borderTop: `1px solid ${colors.borderAccent}`,
    },
    sectionLabel: {
      fontSize: 8,
      fontWeight: "bold",
      fontFamily: "Helvetica-Bold",
      color: colors.textSecondary,
      marginBottom: 2,
    },
    feature: {
      fontSize: 9,
      color: colors.textSecondary,
      marginBottom: 2,
      paddingLeft: 5,
    },
    techContainer: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 3,
      marginTop: 3,
    },
    techBadge: {
      backgroundColor: colors.primary,
      color: colors.white,
      borderRadius: 2,
      padding: "3px 6px",
      fontSize: 7,
    },
  });

  return (
    <View>
      <Text style={styles.title}>KEY INITIATIVES & PROJECTS</Text>
      {data.map((project, index) => (
        <View key={index} style={styles.projectItem}>
          <View style={styles.projectHeader}>
            {/* <Text style={{ fontSize: 16 }}>🏆</Text> */}
            <Text style={styles.projectTitle}>{project.title}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionLabel}>Features:</Text>
            {project.features.map((feature, i) => (
              <Text key={i} style={styles.feature}>
                • {feature}
              </Text>
            ))}
          </View>

          <View
            style={[
              styles.section,
              { borderTop: "none", marginTop: 4, paddingTop: 0 },
            ]}
          >
            <Text style={styles.sectionLabel}>Technologies:</Text>
            <View style={styles.techContainer}>
              {project.technologies.map((tech, i) => (
                <Text key={i} style={styles.techBadge}>
                  {tech}
                </Text>
              ))}
            </View>
          </View>
        </View>
      ))}
    </View>
  );
}
