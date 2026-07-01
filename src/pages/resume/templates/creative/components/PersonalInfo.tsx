import type { PersonalInfo } from "@/lib/types/buildResumeTypes";
import type { ICreativeColors } from "..";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

interface props {
  data: PersonalInfo;
  colors: ICreativeColors;
}

export default function PersonalInfo({ data, colors }: props) {
  const styles = StyleSheet.create({
    container: {
      // background: `linear-gradient(to right, ${colors.primary}, ${colors.accent})`,
      backgroundColor: colors.accent,
      padding: 16,
      color: colors.background,
    },
    name: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 6,
      fontFamily: "Helvetica-Bold",
    },
    contactGrid: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      fontSize: 9,
      gap: 6,
    },
    contactItem: {
      //   display: "flex",
      flexDirection: "row",
      alignItems: "center",
      gap: 5,
      flex: 1,
    },
    label: {
      fontWeight: "bold",
      marginRight: 4,
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{data.fullName}</Text>
      <View style={styles.contactGrid}>
        <View style={styles.contactItem}>
          <Text style={styles.label}>{data.email}</Text>
        </View>
        <View style={styles.contactItem}>
          <Text style={styles.label}>{data.phone}</Text>
        </View>
        <View style={styles.contactItem}>
          <Text style={styles.label}>{data.address}</Text>
        </View>
      </View>
    </View>
  );
}
