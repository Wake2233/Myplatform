import { NavigationContainer, DarkTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import ProjectsScreen from "../screens/ProjectsScreen";
import ArcadeScreen from "../screens/ArcadeScreen";
import { theme } from "../theme/theme";

export type RootStackParamList = {
  Home: undefined;
  Projects: undefined;
  Arcade: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const navTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: theme.bg,
    card: theme.bg,
    text: theme.text,
    primary: theme.acc,
    border: theme.border,
  },
};

export default function RootNavigator() {
  return (
    <NavigationContainer theme={navTheme}>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: theme.bg },
          headerTintColor: theme.acc,
          headerTitleStyle: { color: theme.text },
          contentStyle: { backgroundColor: theme.bg },
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: ">_ vako" }} />
        <Stack.Screen name="Projects" component={ProjectsScreen} options={{ title: "Work" }} />
        <Stack.Screen name="Arcade" component={ArcadeScreen} options={{ title: "Arcade" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
