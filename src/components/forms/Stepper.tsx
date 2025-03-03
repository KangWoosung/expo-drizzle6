import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { COLORS } from "@/constants/theme";

interface StepperProps {
  currentStep: number;
  totalSteps: number;
}

const Stepper: React.FC<StepperProps> = ({ currentStep, totalSteps }) => {
  return (
    <View className="mx-8">
      <View className="flex flex-row items-center justify-between">
        {/* 스텝 번호와 라인을 함께 생성 */}
        {Array.from({ length: totalSteps }).map((_, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;

          return (
            <React.Fragment key={stepNumber}>
              {/* 스텝 표시 원형 */}
              <View
                className={`h-10 w-10 rounded-full items-center justify-center ${
                  isCompleted || isCurrent ? "bg-gray-700" : "bg-gray-300"
                }`}
              >
                <Text className="text-white font-bold">{stepNumber}</Text>
              </View>

              {/* 연결 라인 - 마지막 스텝이 아닐 경우에만 표시 */}
              {stepNumber < totalSteps && (
                <View className="flex-1 mx-2" style={styles.line}>
                  <View
                    className={isCompleted ? "bg-primary" : "bg-gray-300"}
                    style={styles.innerLine}
                  />
                </View>
              )}
            </React.Fragment>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  line: {
    height: 2,
    justifyContent: "center",
  },
  innerLine: {
    height: 2,
    width: "100%",
  },
});

export default Stepper;
