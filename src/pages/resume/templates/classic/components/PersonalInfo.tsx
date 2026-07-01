import type { AiGeneratedResume } from "@/lib/types/AiGeneratedResume";
import type { ClassicColors } from "..";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

interface props {
  data: AiGeneratedResume["personalInfo"];
  colors: ClassicColors;
}

export default function PersonalInfo({ data, colors }: props) {
  const styles = StyleSheet.create({
    name: {
      fontSize: 24,
      fontWeight: "bold",
      fontFamily: "Times-Bold",
      textAlign: "center",
      letterSpacing: 3,
      color: colors.black,
      marginBottom: 2,
    },
    contactContainer: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      maxWidth: "70%",
      marginHorizontal: "auto",
      gap: 6,
      fontSize: 9,
    },
    contactItem: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      color: colors.black,
    },
  });

  return (
    <View wrap={false}>
      <Text style={styles.name}>{data.fullName}</Text>
      <View style={styles.contactContainer}>
        <Text style={styles.contactItem}>{data.address}</Text>
        <Text style={styles.contactItem}>{data.email}</Text>
        <Text style={styles.contactItem}>{data.phone}</Text>
      </View>
    </View>
  );
}
