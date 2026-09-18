import type { AiGeneratedResume } from "@/lib/types/AiGeneratedResume";
import type { ClassicColors } from "..";
import { Text, View, StyleSheet, Link } from "@react-pdf/renderer";
import LinkIcon from "../../components/LinkIcon";

interface props {
  data: AiGeneratedResume["personalInfo"];
  colors: ClassicColors;
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
  const typeLower = link.type.toLowerCase();

  if (cleanUrl.toLowerCase().includes(typeLower)) {
    return cleanUrl;
  }
  if (typeLower === "other" || typeLower === "website") {
    return cleanUrl;
  }
  return ` ${cleanUrl}`;
}

export default function PersonalInfo({ data, colors, links }: props) {
  const styles = StyleSheet.create({
    name: {
      fontSize: 24,
      fontWeight: "bold",
      fontFamily: "Times-Bold",
      textAlign: "center",
      letterSpacing: 0,
      color: colors.text,
      marginBottom: 2,
    },
    contactContainer: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "wrap",
      gap: 8,
      fontSize: 9,
    },
    contactItem: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      color: colors.text,
    },
    linkItem: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      gap: 2,
    },
    linkText: {
      color: colors.text,
    },
  });

  return (
    <View wrap={false}>
      <Text style={styles.name}>{data.fullName}</Text>
      <View style={styles.contactContainer}>
        {data.address ? (
          <View style={styles.linkItem}>
            <LinkIcon type="address" size={8} color={colors.text} />
            <Text style={styles.contactItem}>{data.address}</Text>
          </View>
        ) : null}
        {data.email ? (
          <View style={styles.linkItem}>
            <LinkIcon type="email" size={8} color={colors.text} />
            <Text style={styles.contactItem}>{data.email}</Text>
          </View>
        ) : null}
        {data.phone ? (
          <View style={styles.linkItem}>
            <LinkIcon type="phone" size={8} color={colors.text} />
            <Text style={styles.contactItem}>{data.phone}</Text>
          </View>
        ) : null}
        {links?.map((link, idx) => (
          <View key={link.id || idx} style={styles.linkItem}>
            <LinkIcon type={link.type} size={8} color={colors.text} />
            <Link src={normalizeUrl(link.url)} style={styles.linkText}>
              {formatLinkText(link)}
            </Link>
          </View>
        ))}
      </View>
    </View>
  );
}
