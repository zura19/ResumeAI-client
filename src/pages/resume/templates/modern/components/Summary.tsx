import type { ModernColors } from "..";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

interface props {
  text: string;
  colors: ModernColors;
}
export default function Summary({ text, colors }: props) {
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
    text: {
      fontSize: 9,
      color: colors.text,
      lineHeight: 1.25,
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>PROFESSIONAL SUMMARY</Text>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}
