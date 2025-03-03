import { View, Text } from "react-native";
import React, { useState } from "react";
import Stepper from "@/components/forms/Stepper";
import { Button } from "@/components/Button";
import { router } from "expo-router";

const complete = () => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <View className="flex my-8 px-8">
      {isLoading ? (
        <Text>로딩 중...</Text>
      ) : (
        <View>
          <Stepper currentStep={3} totalSteps={3} />
          <Text className="text-2xl font-bold my-4 mt-8 mb-16">
            Form Completed
          </Text>

          <View className="flex flex-col items-center justify-center gap-12">
            <Text className="text-2xl text-slate-600">Thank You!</Text>
            <Text className="text-xl text-slate-500">
              Your music preferences have been successfully submitted.
            </Text>
            <Button onPress={() => router.push("/")}>Go to Home</Button>
          </View>
        </View>
      )}
    </View>
  );
};

export default complete;
