/*
2025-02-27 18:32:58
zustand & persist 추가해야 함

2025-02-27 20:56:17
Done!!

멘붕... 오는게...
모든 상황에서, zustand 전역상태가 아니라, storage 의 데이터를 참조해야만 한다. 
그렇다면, zustand 는 왜 필요한가...

*/
import { Text, View, StyleSheet } from "react-native";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userInfoSchema } from "@/zod-schemas/formdata/userInfoSchema";
import { UserInfoSchemaType } from "@/zod-schemas/formdata/index";
import { useState, useEffect } from "react";
import Stepper from "@/components/forms/Stepper";
import { ExpoTextInput } from "@/components/forms/ExpoTextInput";
import { ExpoNumberInput } from "@/components/forms/ExpoNumberInput";
import StepButtons from "@/components/forms/StepButtons";
import { useRouter } from "expo-router";
import { useFormStore } from "@/hooks/useFormStore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ENV } from "@/constants/env";
import { useIsFocused } from "@react-navigation/native";

const index = () => {
  const router = useRouter();
  const isFocused = useIsFocused(); // 현재 페이지가 활성화되었는지 확인
  const [step, setStep] = useState(1);
  const { formData, updateStepData, resetForm } = useFormStore();

  // 스토리지 데이터 로딩 상태 관리
  const [isLoading, setIsLoading] = useState(true);

  // 스토리지에서 데이터 로드
  useEffect(() => {
    const loadData = async () => {
      try {
        // formData가 로드되었는지 확인
        const storedData = await AsyncStorage.getItem(ENV.STORAGE_KEY);
        console.log("storedData..... is...... ", ENV.STORAGE_KEY, storedData);
        if (storedData) {
          // setInitialFormData(JSON.parse(storedData));
          const tempData = JSON.parse(storedData);
          const initialFormData = tempData.state.formData;
          console.log("initialFormData", initialFormData);
          reset({
            name: initialFormData?.userInfo?.name || "",
            email: initialFormData?.userInfo?.email || "",
            password: initialFormData?.userInfo?.password || "",
            age: initialFormData?.userInfo?.age || 0,
          });
        }
      } catch (error) {
        console.error("Failed to load form data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, [isFocused]);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UserInfoSchemaType>({
    resolver: zodResolver(userInfoSchema),
    defaultValues: {
      name: formData?.userInfo?.name || "",
      email: formData?.userInfo?.email || "",
      password: formData?.userInfo?.password || "",
      age: formData?.userInfo?.age || undefined,
    },
  });

  // console.log("formData", formData);
  // console.log("formData name:", formData?.userInfo?.name);

  // RHF 의 밸리데이션 완료후 트리거되는 펑션
  const stepSubmit: SubmitHandler<UserInfoSchemaType> = async (
    data: UserInfoSchemaType
  ) => {
    try {
      // zustand 의 전체 폼 데이터 업데이트
      updateStepData({
        userInfo: data,
        preferences: formData?.preferences || {},
        resonance: formData?.resonance || {},
      });
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
    <View className="flex my-8 px-8">
      {isLoading ? (
        <Text>로딩 중...</Text>
      ) : (
        <View>
          <Stepper currentStep={1} totalSteps={3} />
          <Text className="text-2xl font-bold my-4 mt-8">User Information</Text>

          <ExpoTextInput
            control={control}
            inputName="name"
            label="Name"
            placeholder="Enter your name"
            className="mb-4"
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
      )}
    </View>
  );
};

export default index;
