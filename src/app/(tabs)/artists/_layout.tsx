import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const _layout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Artists" }} />
      <Stack.Screen name="[id]" options={{ title: "Artist Detail" }} />
      <Stack.Screen name="albums" options={{ headerShown: false }} />
    </Stack>
  );
};

export default _layout;
