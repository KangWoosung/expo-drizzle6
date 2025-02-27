/*
2025-02-27 16:44:43
RNR 에서 복붙해온 코드임에도 불구하고,
RN 에서는 cva 가 react 처럼 작동되지 않는다고 한다. 
variant 가 사용되는 코드를 claude 의 지침대로 수정해본다. 


*/
import * as React from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  ViewStyle,
  StyleProp,
} from "react-native";
import { COLORS } from "@/constants/Colors";

type ButtonVariant =
  | "default"
  | "outline"
  | "destructive"
  | "secondary"
  | "ghost"
  | "link";

type ButtonProps = React.ComponentPropsWithoutRef<typeof Pressable> & {
  variant?: ButtonVariant;
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

const Button = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  ButtonProps
>(({ variant = "default", style, children, ...props }, ref) => {
  return (
    <Pressable
      style={[styles.button, styles[variant], style]}
      ref={ref}
      {...props}
    >
      <Text style={[styles.text, styles[`${variant}Text`]]}>{children}</Text>
    </Pressable>
  );
});

const styles = StyleSheet.create({
  button: {
    padding: 12,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  default: {
    backgroundColor: COLORS.foregroundPrimary,
  },
  outline: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: COLORS.foregroundTertiary,
  },
  destructive: {
    backgroundColor: "#ff4444",
  },
  secondary: {
    backgroundColor: COLORS.foregroundSecondary,
  },
  ghost: {
    backgroundColor: "transparent",
  },
  link: {
    backgroundColor: "transparent",
  },
  text: {
    fontSize: 16,
    fontWeight: "500",
  },
  defaultText: {
    color: "#fff",
  },
  outlineText: {
    color: COLORS.foregroundPrimary,
  },
  destructiveText: {
    color: "#fff",
  },
  secondaryText: {
    color: "#fff",
  },
  ghostText: {
    color: COLORS.foregroundPrimary,
  },
  linkText: {
    color: COLORS.foregroundPrimary,
    textDecorationLine: "underline",
  },
});

Button.displayName = "Button";

export { Button };
export type { ButtonProps };
