import { ScrollView, Text, View, Pressable, StyleSheet } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../navigation/RootNavigator";
import { useI18n } from "../i18n/i18n";
import { profile } from "../content";
import { theme } from "../theme/theme";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

export default function HomeScreen({ navigation }: Props) {
  const { t, pick, toggle } = useI18n();
  return (
    <ScrollView style={{ backgroundColor: theme.bg }} contentContainerStyle={styles.wrap}>
      <Text style={styles.badge}>● {t("home.available")}</Text>
      <Text style={styles.prompt}>vako@my-platform:~$ whoami</Text>
      <Text style={styles.name}>{profile.name}</Text>
      <Text style={styles.role}>{pick(profile.role)}</Text>
      <Text style={styles.tagline}>{pick(profile.tagline)}</Text>

      <View style={styles.row}>
        <Pressable style={[styles.btn, styles.btnPrimary]} onPress={() => navigation.navigate("Projects")}>
          <Text style={styles.btnPrimaryText}>{t("home.viewWork")} →</Text>
        </Pressable>
        <Pressable style={styles.btn} onPress={() => navigation.navigate("Arcade")}>
          <Text style={styles.btnText}>🐍 {t("home.arcade")}</Text>
        </Pressable>
      </View>

      <View style={styles.stats}>
        <Stat n="5" l="production systems" />
        <Stat n="4" l="domains" />
        <Stat n="10+" l="technologies" />
      </View>

      <Pressable style={styles.lang} onPress={toggle}>
        <Text style={styles.langText}>🌐 {t("lang.toggle")}</Text>
      </Pressable>
    </ScrollView>
  );
}

function Stat({ n, l }: { n: string; l: string }) {
  return (
    <View>
      <Text style={styles.statN}>{n}</Text>
      <Text style={styles.statL}>{l}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { padding: 24, gap: 12 },
  badge: {
    alignSelf: "flex-start",
    color: theme.acc,
    fontFamily: theme.mono,
    fontSize: 12,
    borderWidth: 1,
    borderColor: theme.borderStrong,
    borderRadius: 999,
    paddingVertical: 6,
    paddingHorizontal: 12,
    overflow: "hidden",
  },
  prompt: { color: theme.dim, fontFamily: theme.mono, marginTop: 12 },
  name: { color: theme.text, fontSize: 38, fontWeight: "800", letterSpacing: -1 },
  role: { color: theme.acc, fontFamily: theme.mono, fontSize: 15 },
  tagline: { color: theme.dim, fontSize: 15, lineHeight: 23, marginTop: 6 },
  row: { flexDirection: "row", gap: 10, marginTop: 20, flexWrap: "wrap" },
  btn: {
    borderWidth: 1,
    borderColor: theme.borderStrong,
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 18,
  },
  btnText: { color: theme.text, fontFamily: theme.mono, fontSize: 13 },
  btnPrimary: { backgroundColor: theme.acc, borderColor: theme.acc },
  btnPrimaryText: { color: "#04140d", fontFamily: theme.mono, fontWeight: "700", fontSize: 13 },
  stats: { flexDirection: "row", gap: 28, marginTop: 30 },
  statN: { color: theme.acc, fontFamily: theme.mono, fontSize: 26, fontWeight: "700" },
  statL: { color: theme.muted, fontSize: 12 },
  lang: { marginTop: 34, alignSelf: "flex-start" },
  langText: { color: theme.dim, fontFamily: theme.mono, fontSize: 13 },
});
