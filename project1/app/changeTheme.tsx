import { ThemedButton } from "@/components/ThemedButton";
import { ThemedText } from "@/components/ThemedText";
import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Alert, View } from "react-native";
import { RootState } from "@/store/store";
import { changeTheme } from "@/store/features/themeSlice";
import { Colors } from "@/constants/Colors";

export default function ChangeTheme() {
  const theme = useSelector((state: RootState) => state.theme.theme)
  const dispatch = useDispatch()

  const txtColor = Colors[theme].text;
  return (
    <View style={{ flex: 1, justifyContent: "center", backgroundColor: theme == "light" ? "#fff" : "#000"}}>
      <ThemedText
        align="center"
        type="title"
        style={{color : txtColor}}
      >
        Change App's Theme
      </ThemedText>
      <ThemedButton
      onPress={() => dispatch(changeTheme())}
      txtColor={theme == "light" ? "red" : "#fff"}
      bgColor={theme == "light" ? "#000" : "purple"}
      my={20}
      txt="Change Theme" />
    </View>
  );
}
