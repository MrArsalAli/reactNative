import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { store } from "../store/store";
import { Provider } from "react-redux";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  return (
    <Provider store={store}>
      <Stack screenOptions={{headerShown : false}} initialRouteName="index">
        <Stack.Screen name="index" />
        <Stack.Screen name="/bykea" />
        <Stack.Screen name="/flatlist" />
        <Stack.Screen name="/changeTheme" />
      </Stack>
    </Provider>
  );
}
