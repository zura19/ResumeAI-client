import type { AiGeneratedResume } from "@/lib/types/AiGeneratedResume";
import type { ClassicColors } from "..";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

interface props {
  data: AiGeneratedResume["projects"];
  colors: ClassicColors;
}

export default function Projects({ data, colors }: props) {
  const styles = StyleSheet.create({
    title: {
      fontSize: 12,
      fontWeight: "bold",
      fontFamily: "Times-Bold",
      color: colors.text,
      paddingBottom: 4,
      marginBottom: 4,
      borderBottom: `1px solid ${colors.rule}`,
    },
    projectItem: {
      marginBottom: 4,
    },
    projectTitle: {
      fontSize: 10,
      fontFamily: "Times-Bold",
      color: colors.text,
      marginBottom: 1,
    },
    technologies: {
      fontSize: 9,
      fontFamily: "Times-Italic",
      color: colors.text,
      marginBottom: 4,
    },
    feature: {
      fontSize: 9,
      color: colors.text,
      marginBottom: 2,
      display: "flex",
      flexDirection: "row",
      alignItems: "flex-start",
      lineHeight: 1.25,
    },
    bullet: {
      width: 4,
      height: 4,
      borderRadius: 2,
      backgroundColor: colors.text,
      marginRight: 3,
      marginTop: 2,
    },
  });

  return (
    <View>
      <Text style={styles.title}>Projects</Text>
      {data.map((project, index) => (
        <View wrap={false} key={index} style={styles.projectItem}>
          <Text style={styles.projectTitle}>{project.title}</Text>
          <Text style={styles.technologies}>
            {project.technologies.join(", ")}
          </Text>
          {project.features.map((feature, idx) => (
            <View key={idx} style={styles.feature}>
              <View style={styles.bullet} />
              <Text style={{ flex: 1 }}>{feature}</Text>
            </View>
          ))}
        </View>
      ))}
    </View>
  );
}
