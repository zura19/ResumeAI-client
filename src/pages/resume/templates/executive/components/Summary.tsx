import type { ExecutiveColors } from "..";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

interface props {
  text: string;
  colors: ExecutiveColors;
}

export default function Summary({ text, colors }: props) {
  const styles = StyleSheet.create({
    section: {
      paddingLeft: 10,
      borderLeft: `2px solid ${colors.accent}`,
    },
    title: {
      fontSize: 13,
      fontWeight: "bold",
      fontFamily: "Helvetica-Bold",
      color: colors.text,
      marginBottom: 4,
      textTransform: "uppercase",
      letterSpacing: 1,
    },
    text: {
      fontSize: 9,
      color: colors.textTertiary,
      lineHeight: 1.25,
    },
  });

  return (
    <View style={styles.section}>
      <Text style={styles.title}>EXECUTIVE SUMMARY</Text>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}
