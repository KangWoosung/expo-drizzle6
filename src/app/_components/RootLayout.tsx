import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { Children } from "react";
import { ThemeState, useThemeStore } from "../../contexts/themeStore";
import { Stack } from "expo-router";
import { getColors } from "@/constants/color";
import { iconSize } from "@/constants/tokens";
import { ENV } from "@/constants/env";
import { Ionicons } from "@expo/vector-icons";
import { useArtistAlbumZustand } from "@/contexts/ArtistAlbumZustand";
import { useRouter } from "expo-router";
const defaultAvatar = require("@/assets/images/default-avatar.png");

// JS 개발자는 타입선언과 펑션 파라메터의 타입지정을 스킵하시면 됩니다.
type RootStackProps = {
  avatar: { uri: string };
  noticeCnt: number;
  colorScheme: string | undefined;
  toggleColorScheme: () => void;
  children?: React.ReactNode;
  initialRouteName?: string;
};

const RootStackLayout = ({
  avatar,
  noticeCnt,
  colorScheme,
  toggleColorScheme,
  initialRouteName,
}: RootStackProps) => {
  const currentColors = getColors(colorScheme as "light" | "dark" | undefined);

  //useThemeStore
  const theme = useThemeStore((state) => state.theme);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);
  const isDarkMode = theme === "dark";

  const { artistZustandObj } = useArtistAlbumZustand();
  const router = useRouter();

  const handleToggle = () => {
    console.log("toggleColorScheme");
    toggleColorScheme();
  };

  return (
    <Stack screenOptions={{ headerShown: true }}>
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: currentColors.background,
          },
          headerTintColor: currentColors.foreground,
          headerLeft: () => (
            <Image
              source={avatar.uri ? { uri: avatar.uri } : defaultAvatar}
              className="rounded-full mx-4"
              style={{
                width: iconSize.base,
                height: iconSize.base,
                resizeMode: "cover",
              }}
            />
          ),
          headerRight: () => (
            <>
              <View className="relative flex flex-row gap-0 mx-6">
                <Ionicons
                  name="notifications-outline"
                  size={iconSize.base}
                  color={currentColors.foreground}
                  className="mx-4"
                />
                <Text
                  className="absolute -x-1 w-6 h-5 px-1.5 rounded-full bg-red-400 text-gray-100"
                  style={{
                    position: "absolute",
                    top: -2,
                    right: -10,
                    color: "#f3f4f6",
                    backgroundColor: "#f87171",
                    borderRadius: 9999,
                    width: 24,
                    height: 24,
                    padding: 4,
                    textAlign: "center",
                  }}
                >
                  {noticeCnt}
                </Text>
              </View>
              <TouchableOpacity onPress={handleToggle}>
                {colorScheme === "dark" ? (
                  <Ionicons
                    name="moon-outline"
                    size={iconSize.base}
                    color={currentColors.foreground}
                    className="mx-2"
                  />
                ) : (
                  <Ionicons
                    name="sunny-outline"
                    size={iconSize.base}
                    color={currentColors.foreground}
                    className="mx-2"
                  />
                )}
              </TouchableOpacity>
            </>
          ),
          headerTitle: () => (
            <View className="flex flex-row justify-center items-center">
              <Ionicons
                name="logo-stackoverflow"
                size={iconSize.base}
                color={currentColors.foreground}
                className="mx-2"
              />
              <Text
                className="font-bold"
                style={{
                  color: currentColors.foreground,
                }}
              >
                {ENV.APP_NAME}
              </Text>
            </View>
          ),
          headerTitleAlign: "center",
          animation: "slide_from_right",
          animationDuration: 500,
          gestureEnabled: true,
          gestureDirection: "horizontal",
        }}
      />
      <Stack.Screen name="+not-found" options={{ headerShown: false }} />
    </Stack>
  );
};

export default RootStackLayout;
