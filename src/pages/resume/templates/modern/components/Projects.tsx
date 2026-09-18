import type { AiGeneratedResume } from "@/lib/types/AiGeneratedResume";
import type { ModernColors } from "..";
import { Text, View, StyleSheet, Link } from "@react-pdf/renderer";

interface props {
  data: AiGeneratedResume["projects"];
  colors: ModernColors;
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
    },
    projectItem: {
      marginBottom: 6,
      paddingLeft: 6,
      borderLeft: `2px solid ${colors.primary}`,
    },
    header: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 2,
    },
    projectTitle: {
      fontSize: 10,
      fontWeight: "bold",
      fontFamily: "Helvetica-Bold",
      color: colors.text,
    },
    projectLink: {
      fontSize: 8,
      color: colors.primary,
      textDecoration: "underline",
    },
    techSection: {
      marginBottom: 4,
    },
    techLabel: {
      fontSize: 8,
      color: colors.textTertiary,
      fontWeight: "bold",
      fontFamily: "Helvetica-Bold",
      marginBottom: 2,
    },
    techContainer: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 3,
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
      marginBottom: 2,
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
    <View>
      <Text style={styles.title}>PROJECTS</Text>
      {data.map((project, index) => (
        <View wrap={false} key={project.id || index} style={styles.projectItem}>
          <View style={styles.header}>
            <Text style={styles.projectTitle}>{project.title}</Text>
            {project.url && (
              <Link src={normalizeUrl(project.url)} style={styles.projectLink}>
                {formatProjectUrl(project.url)}
              </Link>
            )}
          </View>

          {project.technologies.length > 0 && (
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
          )}

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
