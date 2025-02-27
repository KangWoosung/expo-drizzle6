import { View, Text } from "react-native";
import React from "react";
import { Button } from "@/components/Button";

type StepButtonsProps = {
  step: number;
  goPreviouse: () => void;
  stepSubmit: (data: any) => void;
};

const StepButtons = ({ step, goPreviouse, stepSubmit }: StepButtonsProps) => {
  return (
    <View className="flex flex-grow mt-8">
      {step < 4 && (
        <View className="flex flex-row justify-between items-center mt-8">
          {step > 1 ? (
            <Button onPress={goPreviouse} variant="outline">
              <Text>Previous</Text>
            </Button>
          ) : (
            <View />
          )}
          <Button onPress={stepSubmit} className={step === 1 ? "ml-auto" : ""}>
            <Text>{step === 3 ? "Submit" : "Next"}</Text>
          </Button>
        </View>
      )}
    </View>
  );
};

export default StepButtons;
