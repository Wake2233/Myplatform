import { FlatList, Text, View, StyleSheet } from "react-native";
import { useI18n } from "../i18n/i18n";
import { projects } from "../content";
import { theme } from "../theme/theme";

export default function ProjectsScreen() {
  const { pick } = useI18n();
  return (
    <FlatList
      style={{ backgroundColor: theme.bg }}
      contentContainerStyle={{ padding: 20, gap: 14 }}
      data={projects}
      keyExtractor={(p) => p.id}
      renderItem={({ item, index }) => (
        <View style={styles.card}>
          <Text style={styles.idx}>0{index + 1}</Text>
          <Text style={styles.title}>{pick(item.title)}</Text>
          <Text style={styles.kind}>{pick(item.kind)}</Text>
          <View style={styles.chips}>
            {item.stack.map((s) => (
              <Text key={s} style={styles.chip}>
                {s}
              </Text>
            ))}
          </View>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.surface,
    borderWidth: 1,
    borderColor: theme.border,
    borderRadius: theme.radius,
    padding: 18,
  },
  idx: { color: theme.acc, fontFamily: theme.mono, opacity: 0.7, marginBottom: 4 },
  title: { color: theme.text, fontSize: 17, fontWeight: "700" },
  kind: { color: theme.muted, fontFamily: theme.mono, fontSize: 12, marginTop: 4, marginBottom: 12 },
  chips: { flexDirection: "row", flexWrap: "wrap", gap: 6 },
  chip: {
    color: theme.dim,
    fontFamily: theme.mono,
    fontSize: 11,
    borderWidth: 1,
    borderColor: theme.border,
    borderRadius: 999,
    paddingVertical: 3,
    paddingHorizontal: 9,
    overflow: "hidden",
  },
});
