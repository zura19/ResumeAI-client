import { StyleSheet } from "@react-pdf/renderer";
import { Text, View } from "@react-pdf/renderer";

interface props {
  colors: {
    primary: string;
    accent: string;
    background: string;
    text: string;
    secondaryText: string;
  };
  text: string;
}

export default function Summary({ colors, text }: props) {
  const styles = StyleSheet.create({
    title: {
      fontSize: 12,
      fontWeight: "bold",
      fontFamily: "Helvetica-Bold",
      color: colors.text,
      marginBottom: 8,
      borderBottom: `1.5px solid ${colors.primary}`,
      paddingBottom: 4,
      //   display: "inline-block",
    },
    text: {
      fontSize: 9,
      color: colors.secondaryText,
      lineHeight: 1.25,
      marginTop: 0,
    },
  });

  return (
    <View>
      <Text style={styles.title}>About Me</Text>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}
