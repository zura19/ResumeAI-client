import type { AiGeneratedResume } from "@/lib/types/AiGeneratedResume";
import type { ExecutiveColors } from "..";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

interface props {
  data: AiGeneratedResume["personalInfo"];
  colors: ExecutiveColors;
}

export default function PersonalInfo({ data, colors }: props) {
  const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.primary,
      padding: 18,
      marginTop: -16,
      marginHorizontal: -16,
      color: colors.white,
      borderBottom: `2px solid ${colors.accent}`,
    },
    name: {
      fontSize: 26,
      fontWeight: "bold",
      marginBottom: 11,
      fontFamily: "Helvetica-Bold",
    },
    contactGrid: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 9,
      fontSize: 9,
    },
    contactItem: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      gap: 5,
    },
    icon: {
      color: colors.accentLight,
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{data.fullName}</Text>
      <View style={styles.contactGrid}>
        <View style={styles.contactItem}>
          {/* <Text style={styles.icon}>📧</Text> */}
          <Text>{data.email}</Text>
        </View>
        <View style={styles.contactItem}>
          {/* <Text style={styles.icon}>📞</Text> */}
          <Text>{data.phone}</Text>
        </View>
        <View style={styles.contactItem}>
          {/* <Text style={styles.icon}>📍</Text> */}
          <Text>{data.address}</Text>
        </View>
      </View>
    </View>
  );
}
