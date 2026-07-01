import type { AiGeneratedResume } from "@/lib/types/AiGeneratedResume";
import type { ICreativeColors } from "..";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

interface props {
  data: AiGeneratedResume["projects"];
  colors: ICreativeColors;
}

export default function Projects({ data, colors }: props) {
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
    projectItem: {
      marginBottom: 7,
      padding: 6,
      border: `1px solid ${colors.accent}`,
      borderRadius: 4,
    },
    projectTitle: {
      fontSize: 10,
      fontWeight: "bold",
      fontFamily: "Helvetica-Bold",
      color: colors.text,
      marginBottom: 5,
    },
    feature: {
      fontSize: 9,
      color: colors.secondaryText,
      marginBottom: 4,
      paddingLeft: 0,
    },
    techContainer: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 4,
      marginTop: 5,
    },
    techBadge: {
      backgroundColor: "#06b5d44f",
      color: colors.secondaryText,
      borderRadius: 6,
      padding: "3px 6px",
      fontSize: 8,
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Projects</Text>
      {data.map((project, index) => (
        <View key={index} style={styles.projectItem}>
          <Text style={styles.projectTitle}>{project.title}</Text>
          {project.features.map((feature, i) => (
            <Text key={i} style={styles.feature}>
              • {feature}
            </Text>
          ))}
          <View style={styles.techContainer}>
            {project.technologies.map((tech, i) => (
              <Text key={i} style={styles.techBadge}>
                {tech}
              </Text>
            ))}
          </View>
        </View>
      ))}
    </View>
  );
}
