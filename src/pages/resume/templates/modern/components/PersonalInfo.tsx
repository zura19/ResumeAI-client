import type { AiGeneratedResume } from "@/lib/types/AiGeneratedResume";
import type { ModernColors } from "..";
import { Text, View, StyleSheet, Link } from "@react-pdf/renderer";
import LinkIcon from "../../components/LinkIcon";

interface props {
  data: AiGeneratedResume["personalInfo"];
  colors: ModernColors;
  links?: AiGeneratedResume["links"];
}

function normalizeUrl(url: string): string {
  if (!url) return "";
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }
  return `https://${url}`;
}

function formatLinkText(link: { url: string; type: string }): string {
  const cleanUrl = link.url
    .replace(/^https?:\/\/(www\.)?/, "")
    .replace(/\/$/, "");
  return cleanUrl;
}

export default function PersonalInfo({ data, colors, links }: props) {
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
      alignItems: "center",
      gap: 8,
      fontSize: 9,
      color: colors.textSecondary,
    },
    contactItem: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      gap: 3,
      color: colors.textSecondary,
    },
    linkText: {
      color: colors.textSecondary,
      textDecoration: "none",
    },
  });

  return (
    <View style={styles.header}>
      <Text style={styles.name}>{data.fullName}</Text>
      <View style={styles.contactLine}>
        {data.email ? (
          <View style={styles.contactItem}>
            <LinkIcon type="email" size={8} color={colors.textSecondary} />
            <Text>{data.email}</Text>
          </View>
        ) : null}
        {data.phone ? (
          <View style={styles.contactItem}>
            <LinkIcon type="phone" size={8} color={colors.textSecondary} />
            <Text>{data.phone}</Text>
          </View>
        ) : null}
        {data.address ? (
          <View style={styles.contactItem}>
            <LinkIcon type="address" size={8} color={colors.textSecondary} />
            <Text>{data.address}</Text>
          </View>
        ) : null}
        {links?.map((link, idx) => (
          <View key={link.id || idx} style={styles.contactItem}>
            <LinkIcon type={link.type} size={8} color={colors.textSecondary} />
            <Link src={normalizeUrl(link.url)} style={styles.linkText}>
              {formatLinkText(link)}
            </Link>
          </View>
        ))}
      </View>
    </View>
  );
}
