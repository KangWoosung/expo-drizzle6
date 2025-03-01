import { COLORS, SPACING } from "@/constants/theme";

export const getStyleByVariant = (
  variant: "primary" | "secondary" | "danger"
) => {
  switch (variant) {
    case "primary":
      return { backgroundColor: COLORS.primary };
    case "secondary":
      return { backgroundColor: COLORS.secondary };
    case "danger":
      return { backgroundColor: COLORS.accent };
    default:
      return {};
  }
};
