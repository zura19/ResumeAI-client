import type { AiGeneratedResume } from "@/lib/types/AiGeneratedResume";
import type { ICreativeColors } from "..";
import { Text, View, StyleSheet, Link } from "@react-pdf/renderer";

interface props {
  data: AiGeneratedResume["projects"];
  colors: ICreativeColors;
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
      borderBottom: `1.5px solid ${colors.primary}`,
      paddingBottom: 4,
    },
    projectItem: {
      marginBottom: 6,
      padding: 5,
      border: `1px solid ${colors.accent}`,
      borderRadius: 3,
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
    feature: {
      fontSize: 9,
      color: colors.secondaryText,
      marginBottom: 2,
      paddingLeft: 0,
    },
    techContainer: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 3,
      marginTop: 3,
    },
    techBadge: {
      backgroundColor: "#06b5d44f",
      color: colors.secondaryText,
      borderRadius: 4,
      padding: "2px 5px",
      fontSize: 8,
    },
  });

  return (
    <View>
      <Text style={styles.title}>Projects</Text>
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
          {project.features.map((feature, i) => (
            <Text key={i} style={styles.feature}>
              • {feature}
            </Text>
          ))}
          {project.technologies.length > 0 && (
            <View style={styles.techContainer}>
              {project.technologies.map((tech, i) => (
                <Text key={i} style={styles.techBadge}>
                  {tech}
                </Text>
              ))}
            </View>
          )}
        </View>
      ))}
    </View>
  );
}
