import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import RootNavigator from "./src/navigation/RootNavigator";
import { I18nProvider } from "./src/i18n/i18n";

export default function App() {
  return (
    <SafeAreaProvider>
      <I18nProvider>
        <RootNavigator />
        <StatusBar style="light" />
      </I18nProvider>
    </SafeAreaProvider>
  );
}
