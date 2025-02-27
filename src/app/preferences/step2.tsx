import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import Stepper from "@/components/forms/Stepper";
import StepButtons from "@/components/forms/StepButtons";
import { router } from "expo-router";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { preferencesSchema } from "@/zod-schemas/formdata/preferencesSchema";
import { PreferencesSchemaType } from "@/zod-schemas/formdata/index";
import { useFormStore } from "@/hooks/useFormStore";
import { ExpoSelectTags } from "@/components/forms/ExpoSelectTags";

const step2 = () => {
  const [step, setStep] = useState(2);
  const { formData, updateStepData, resetForm } = useFormStore();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PreferencesSchemaType>({
    resolver: zodResolver(preferencesSchema),
    defaultValues: {
      genre: formData[1]?.preferences?.genre || [],
      preferredDevice: formData[1]?.preferences?.preferredDevice || "",
      moodBasedChoices: formData[1]?.preferences?.moodBasedChoices || [],
      frequency: formData[1]?.preferences?.frequency || "",
      instruments: formData[1]?.preferences?.instruments || [],
      skillLevel: formData[1]?.preferences?.skillLevel || "",
    },
  });

  const handleNext: SubmitHandler<PreferencesSchemaType> = async (
    data: PreferencesSchemaType
  ) => {
    try {
      // zustand & storage 보관
      updateStepData(step, {
        userInfo: formData[1]?.userInfo,
        preferences: data,
        resonance: {},
      });
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  // RHF 의 밸리데이션 완료후 트리거되는 펑션
  const stepSubmit: SubmitHandler<PreferencesSchemaType> = async (
    data: PreferencesSchemaType
  ) => {
    try {
      handleNext(data);
      // 다음 스텝으로 이동
      router.push("/preferences/step2");
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  const goPreviouse = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      <Stepper currentStep={2} totalSteps={4} />
      <Text className="text-2xl font-bold mb-4">User Information</Text>

      <View className="flex flex-row flex-wrap gap-4">
        <ExpoSelectTags
          control={control}
          inputName="genre"
          label="Genre"
          placeholder="Select Genre"
          defaultValue={formData[1]?.preferences?.genre || []}
        />
        <ExpoSelectTags
          control={control}
          inputName="classic"
          label="Classic"
          placeholder="Select Genre"
          defaultValue={formData[1]?.preferences?.genre || []}
        />
      </View>

      <StepButtons
        step={step}
        goPreviouse={goPreviouse}
        stepSubmit={handleSubmit(stepSubmit)}
      />
    </View>
  );
};

export default step2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    marginVertical: 4,
    padding: 16,
  },
  input: {
    marginVertical: 10,
  },
});
