import type { AiGeneratedResume } from "@/lib/types/AiGeneratedResume";
import type { ModernColors } from "..";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

interface props {
  data: AiGeneratedResume["personalInfo"];
  colors: ModernColors;
}

export default function PersonalInfo({ data, colors }: props) {
  const styles = StyleSheet.create({
    header: {
      paddingBottom: 8,
      borderBottom: `1px solid ${colors.border}`,
    },
    name: {
      fontSize: 26,
      fontWeight: "bold",
      fontFamily: "Helvetica-Bold",
      marginBottom: 4,
      color: colors.text,
    },
    contactLine: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 7,
      fontSize: 9,
      color: colors.textSecondary,
    },
    contactItem: {
      color: colors.textSecondary,
    },
    separator: {
      color: colors.textSecondary,
    },
  });

  return (
    <View style={styles.header}>
      <Text style={styles.name}>{data.fullName}</Text>
      <View style={styles.contactLine}>
        <Text style={styles.contactItem}>{data.email}</Text>
        <Text style={styles.separator}>•</Text>
        <Text style={styles.contactItem}>{data.phone}</Text>
        <Text style={styles.separator}>•</Text>
        <Text style={styles.contactItem}>{data.address}</Text>
      </View>
    </View>
  );
}
