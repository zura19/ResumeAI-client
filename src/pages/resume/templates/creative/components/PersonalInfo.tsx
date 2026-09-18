import type { PersonalInfo as IPersonalInfo } from "@/lib/types/buildResumeTypes";
import type { AiGeneratedResume } from "@/lib/types/AiGeneratedResume";
import type { ICreativeColors } from "..";
import { Text, View, StyleSheet, Link } from "@react-pdf/renderer";
import LinkIcon from "../../components/LinkIcon";

interface props {
  data: IPersonalInfo;
  colors: ICreativeColors;
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
    container: {
      // background: `linear-gradient(to right, ${colors.primary}, ${colors.accent})`,
      backgroundColor: colors.accent,
      padding: 16,
      marginTop: -16,
      marginHorizontal: -16,
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
      flexWrap: "wrap",
      alignItems: "center",
      gap: 10,
      fontSize: 9,
    },
    contactItem: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      gap: 4,
    },
    linkItem: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      gap: 4,
    },
    linkText: {
      color: colors.background,
      textDecoration: "none",
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{data.fullName}</Text>
      <View style={styles.contactGrid}>
        {data.email ? (
          <View style={styles.contactItem}>
            <LinkIcon type="email" size={8} color={colors.background} />
            <Text>{data.email}</Text>
          </View>
        ) : null}
        {data.phone ? (
          <View style={styles.contactItem}>
            <LinkIcon type="phone" size={8} color={colors.background} />
            <Text>{data.phone}</Text>
          </View>
        ) : null}
        {data.address ? (
          <View style={styles.contactItem}>
            <LinkIcon type="address" size={8} color={colors.background} />
            <Text>{data.address}</Text>
          </View>
        ) : null}
        {links?.map((link, idx) => (
          <View key={link.id || idx} style={styles.linkItem}>
            <LinkIcon type={link.type} size={8} color={colors.background} />
            <Link src={normalizeUrl(link.url)} style={styles.linkText}>
              {formatLinkText(link)}
            </Link>
          </View>
        ))}
      </View>
    </View>
  );
}
