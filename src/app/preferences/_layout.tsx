import { Stack } from "expo-router";

export default function PreferencesLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ title: "Step 1: 기본 정보" }} />
      <Stack.Screen name="step2" />
      <Stack.Screen name="step3" options={{ title: "Step 3: 추가 설정" }} />
      <Stack.Screen name="review" options={{ title: "입력 정보 확인" }} />
    </Stack>
  );
}
