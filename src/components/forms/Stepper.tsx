import { Text, View } from "react-native";

export default function Stepper({
  currentStep,
  totalSteps,
}: {
  currentStep: number;
  totalSteps: number;
}) {
  return (
    <View className="flex flex-row items-center justify-between mb-8">
      {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
        <View key={step} className="flex items-center flex-1">
          <View
            className={`relative z-10 flex items-center justify-center w-10 h-10 rounded-full border-2 ${
              step <= currentStep
                ? "bg-primary border-primary text-primary-foreground"
                : "bg-background border-gray-300 text-gray-500"
            }`}
          >
            <Text>{step}</Text>
          </View>
          {step < totalSteps && (
            <View
              className={` h-0.5 ${
                step < currentStep ? "bg-primary" : "bg-gray-300"
              }`}
            />
          )}
        </View>
      ))}
    </View>
  );
}
