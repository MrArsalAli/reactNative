import { ThemedButton } from "@/components/ThemedButton";
import { ThemedText } from "@/components/ThemedText";
import React from "react";
import { Alert, Text, View } from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { router } from "expo-router";
import { Colors } from "@/constants/Colors";
import { themeSlice } from "@/store/features/themeSlice";

export default function Index() {
  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <ThemedText style={{ color: "#000", textAlign: "center" }} type="title">
        Welcome Screen
      </ThemedText>
      <ThemedButton
        icon={<FontAwesome5 name="google" size={24} color="black" />}
        my={20}
        bgColor="purple"
        txt="Login to Continue"
      />
      <ThemedButton
        onPress={() => router.push("/flatlist")}
        bgColor="purple"
        txt="Flatlist"
      />
      <ThemedButton
        my={20}
        onPress={() => router.push("/bykea")}
        bgColor="purple"
        txt="Bykea"
      />
      <ThemedButton
        onPress={() => router.push("/changeTheme")}
        bgColor="purple"
        txt="Theme Config"
      />
    </View>
  );
}
