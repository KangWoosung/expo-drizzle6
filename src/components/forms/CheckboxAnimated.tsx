import { StyleSheet } from "react-native";
import Color from "color";
import { AntDesign } from "@expo/vector-icons";
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

import { ACTIVE_COLOR, INACTIVE_COLOR } from "@/constants/Colors";

type CheckboxProps = {
  label: string;
  checked: boolean;
  onPress: () => void;
};

const TimingConfig = {
  duration: 150,
};

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  checked,
  onPress,
}: CheckboxProps) => {
  const fadedActiveColor = Color(ACTIVE_COLOR).alpha(0.1).toString();

  const rContainerStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: withTiming(
        checked ? fadedActiveColor : "transparent",
        TimingConfig
      ),
      borderColor: withTiming(
        checked ? ACTIVE_COLOR : INACTIVE_COLOR,
        TimingConfig
      ),
      paddingLeft: 12,
      paddingRight: !checked ? 16 : 12,
    };
  }, [checked]);

  const rTextStyle = useAnimatedStyle(() => {
    return {
      color: withTiming(checked ? ACTIVE_COLOR : INACTIVE_COLOR, TimingConfig),
    };
  }, [checked]);

  return (
    <Animated.View
      layout={LinearTransition.springify().mass(0.8)}
      style={[styles.container, rContainerStyle]}
      onTouchEnd={onPress}
    >
      <Animated.Text style={[styles.label, rTextStyle]}>{label}</Animated.Text>
      {checked && (
        <Animated.View
          entering={FadeIn.duration(350)}
          exiting={FadeOut}
          style={{
            marginLeft: 8,
            justifyContent: "center",
            alignItems: "center",
            height: 20,
            width: 20,
          }}
        >
          <AntDesign name="checkcircle" size={20} color={ACTIVE_COLOR} />
        </Animated.View>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 32,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    fontSize: 16,
    fontFamily: "SF-Pro-Rounded-Bold",
  },
});
