import { View, Text, StyleSheet } from "react-native";
import { useI18n } from "../i18n/i18n";
import { theme } from "../theme/theme";

export default function ArcadeScreen() {
  const { t } = useI18n();
  return (
    <View style={styles.wrap}>
      <Text style={styles.emoji}>🐍</Text>
      <Text style={styles.title}>{t("arcade.title")}</Text>
      <Text style={styles.note}>{t("arcade.note")}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: theme.bg, alignItems: "center", justifyContent: "center", padding: 32, gap: 14 },
  emoji: { fontSize: 54 },
  title: { color: theme.acc, fontFamily: theme.mono, fontSize: 18, textAlign: "center" },
  note: { color: theme.dim, fontSize: 14, lineHeight: 22, textAlign: "center", maxWidth: 320 },
});
