import type { AiGeneratedResume } from "@/lib/types/AiGeneratedResume";
import type { ExecutiveColors } from "..";
import { Text, View, StyleSheet, Link } from "@react-pdf/renderer";

interface props {
  data: AiGeneratedResume["projects"];
  colors: ExecutiveColors;
}

function normalizeUrl(url: string): string {
  if (!url) return "";
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }
  return `https://${url}`;
}

function formatProjectUrl(url: string): string {
  return url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
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
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 2,
    },
    projectTitle: {
      fontSize: 11,
      fontWeight: "bold",
      fontFamily: "Helvetica-Bold",
      color: colors.text,
    },
    projectLink: {
      fontSize: 8,
      color: colors.primary,
      textDecoration: "underline",
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
        <View wrap={false} key={project.id || index} style={styles.projectItem}>
          <View style={styles.projectHeader}>
            <Text style={styles.projectTitle}>{project.title}</Text>
            {project.url && (
              <Link src={normalizeUrl(project.url)} style={styles.projectLink}>
                {formatProjectUrl(project.url)}
              </Link>
            )}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionLabel}>Features:</Text>
            {project.features.map((feature, i) => (
              <Text key={i} style={styles.feature}>
                • {feature}
              </Text>
            ))}
          </View>

          {project.technologies.length > 0 && (
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
          )}
        </View>
      ))}
    </View>
  );
}
