/*
2025-02-27 18:32:58
zustand & persist 추가해야 함

2025-02-27 20:56:17
Done!!


*/
import { Text, View, StyleSheet } from "react-native";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userInfoSchema } from "@/zod-schemas/formdata/userInfoSchema";
import { UserInfoSchemaType } from "@/zod-schemas/formdata/index";
import { useState } from "react";
import Stepper from "@/components/forms/Stepper";
import { ExpoTextInput } from "@/components/forms/ExpoTextInput";
import { ExpoNumberInput } from "@/components/forms/ExpoNumberInput";
import { Button } from "@/components/Button";
import StepButtons from "@/components/forms/StepButtons";
import { useRouter } from "expo-router";
import { useFormStore } from "@/hooks/useFormStore";

const index = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState<number | undefined>(undefined);
  const [password, setPassword] = useState("");
  const { formData, updateStepData, resetForm } = useFormStore();

  // console.log("formData", formData);
  // console.log("formData name:", formData?.userInfo?.name);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UserInfoSchemaType>({
    resolver: zodResolver(userInfoSchema),
    defaultValues: {
      name: formData?.userInfo?.name || "",
      email: formData?.userInfo?.email || "",
      password: formData?.userInfo?.password || "",
      age: formData?.userInfo?.age || undefined,
    },
  });

  const handleNext: SubmitHandler<UserInfoSchemaType> = async (
    data: UserInfoSchemaType
  ) => {
    try {
      // zustand & storage 보관
      updateStepData(step, {
        userInfo: data,
        preferences: {},
        resonance: {},
      });
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  // RHF 의 밸리데이션 완료후 트리거되는 펑션
  const stepSubmit: SubmitHandler<UserInfoSchemaType> = async (
    data: UserInfoSchemaType
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
    <View className="flex  my-8 px-8">
      <Stepper currentStep={1} totalSteps={4} />
      <Text className="text-2xl font-bold mb-4">User Information</Text>

      <ExpoTextInput
        control={control}
        inputName="name"
        label="Name"
        placeholder="Enter your name"
      />

      <ExpoTextInput
        control={control}
        inputName="email"
        placeholder="Enter your email"
      />

      <ExpoTextInput
        control={control}
        inputName="password"
        placeholder="Enter your password"
      />

      <ExpoNumberInput
        control={control}
        inputName="age"
        placeholder="Enter your age"
      />

      <StepButtons
        step={step}
        goPreviouse={goPreviouse}
        stepSubmit={handleSubmit(stepSubmit)}
      />
    </View>
  );
};

export default index;
