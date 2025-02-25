import { Stack } from "expo-router";

export default function AlbumsLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Albums" }} />
      <Stack.Screen name="[id]" options={{ title: "Album Detail" }} />
    </Stack>
  );
}
