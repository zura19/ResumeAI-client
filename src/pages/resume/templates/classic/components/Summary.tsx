import type { ClassicColors } from "..";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

interface props {
  text: string;
  colors: ClassicColors;
}

export default function Summary({ text }: props) {
  const styles = StyleSheet.create({
    text: {
      fontSize: 9,
      lineHeight: 1.25,
      // color: "#333",
      // fontFamily: "Times-Bold",
      textAlign: "justify",
      fontWeight: "",
      //   fontWeight: "Regular",
    },
  });

  return (
    <View>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}
