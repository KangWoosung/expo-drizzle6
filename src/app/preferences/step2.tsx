/*
2025-02-28 17:06:38
Genre 의 enum.array 로 data 를 만들어서 ExpoSelectTags 에 전달하고,
ExpoSelectTags 에서 작동할 펑션들을 함께 전달해준다. 
ExpoSelectTags 에서 작동할 펑션들은:
1. 체크박스 클릭 시 이벤트 핸들러
   -현재 해당 체크박스의 on/off 상태를 확인할 수 있어야 한다. 
   -Genre 의 form.value 값을 업데이트 해줘야 한다. 

현재 헤깔리고 있는 문제가 바로,
handleGenreSelect 와 setSelectedGenres 의 역할을 명확히 정의해두지 못하고 있다는 것인데...
1. setSelectedGenres 는 setState 펑션일 뿐이다. 
   - selectedGenres 어레이 입출력 업데이트를 담당한다.
   - selectedGenres 어레이는 단순히, 선택된 첵박스 목록만을 담는다.
   - handleGenreSelect 내부에서 클로져로 사용되기 때문에, 프롭으로 외부로 전달해주지 않는다.
2. handleGenreSelect 는,
   - 현재 해당 체크박스의 on/off 상태를 근거로, setSelectedGenres 의 가감 옵션을 분기한다. 
   - 반드시 현재 체크박스의 이름과 상태를 인자로 받아야 한다. 

2025-03-01 19:08:24
여기까지는 정리가 되었다. 
이제, 체크박스 클릭시, RHF 의 폼 엘리먼트 상태에 업데이트 해주는 펑션을 작성해야 한다. 




  // 장르 선택 시 RHF 상태 업데이트하는 함수
  const handleGenreSelect = (genreName: string, isSelected: boolean) => {
    // 로컬 상태 업데이트
    if (isSelected) {
      setSelectedGenres([...selectedGenres, genreName]);
    } else {
      setSelectedGenres(selectedGenres.filter((g) => g !== genreName));
    }

    // Genre enum으로 변환
    const genreEnum = Genre[genreName as keyof typeof Genre];

    // RHF 상태 업데이트 - 배열로 변경
    setValue(
      "genre",
      isSelected
        ? [...(watch("genre") || []), genreEnum]
        : (watch("genre") || []).filter((g) => g !== genreEnum)
    );
  };

  // RHF 의 밸리데이션 완료후 트리거되는 펑션
  const stepSubmit: SubmitHandler<PreferencesSchemaType> = async (
    data: PreferencesSchemaType
  ) => {
    try {
      // 이제 data.genre는 이미 Genre[] 타입이므로 바로 사용
      console.log("selectedGenres....", data.genre);

      // zustand & storage 보관
      // updateStepData({
      //   userInfo: formData?.userInfo,
      //   preferences: data,
      //   resonance: formData?.resonance || {},
      // });

      // 다음 스텝으로 이동
      router.push("/preferences/step2");
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

*/
import { View, Text, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import Stepper from "@/components/forms/Stepper";
import StepButtons from "@/components/forms/StepButtons";
import { router } from "expo-router";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { preferencesSchema } from "@/zod-schemas/formdata/preferencesSchema";
import { PreferencesSchemaType } from "@/zod-schemas/formdata/index";
import { useFormStore } from "@/hooks/useFormStore";
import { ExpoSelectTags } from "@/components/forms/ExpoSelectTags";
import { Genre, PreferredDevice } from "@/constants/musicEnums";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ENV } from "@/constants/env";

const step2 = () => {
  const [step, setStep] = useState(2);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedDevices, setSelectedDevices] = useState<string[]>([]);
  const { formData, updateStepData, resetForm } = useFormStore();
  console.log("formData....", formData);

  // 스토리지 데이터 확보
  useEffect(() => {
    const loadData = async () => {
      const storedData = await AsyncStorage.getItem(ENV.STORAGE_KEY);
      if (storedData) {
        const tempData = JSON.parse(storedData);
        const initialFormData = tempData.state.formData;
        console.log("initialFormData.........", initialFormData);
        // setSelectedGenres(initialFormData[1]?.preferences?.genre || []);
      }
    };
    loadData();
  }, []);

  // RHF 상태 관리
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<PreferencesSchemaType>({
    resolver: zodResolver(preferencesSchema),
    defaultValues: {
      genre: formData?.preferences?.genre || [],
      preferredDevice: formData?.preferences?.preferredDevice || [],
      moodBasedChoices: formData?.preferences?.moodBasedChoices || [],
    },
  });

  // 1. 체크박스 클릭 시 이벤트 핸들러
  //  -현재 해당 체크박스의 on/off 상태를 확인할 수 있어야 한다.
  //  -Genre 의 form.value 값을 업데이트 해줘야 한다.
  const handleGenreSelect = (genreName: string, isSelected: boolean) => {
    if (isSelected) {
      setSelectedGenres([...selectedGenres, genreName]);
    } else {
      setSelectedGenres(selectedGenres.filter((g) => g !== genreName));
    }
  };

  const handleDeviceSelect = (deviceName: string, isSelected: boolean) => {
    if (isSelected) {
      setSelectedDevices([...selectedDevices, deviceName]);
    }
  };

  const stepSubmit: SubmitHandler<PreferencesSchemaType> = async (
    data: PreferencesSchemaType
  ) => {
    console.log("data....", data);
    // zustand 의 전체 폼 데이터 업데이트
    updateStepData({
      userInfo: formData?.userInfo,
      preferences: data,
    });
    // 다음 스텝으로 이동
    router.push("/preferences/complete");
  };

  // 로깅용 임시 Effect
  useEffect(() => {
    console.log("선택된 장르:", selectedGenres);
  }, [selectedGenres]);

  // RHF 폼 값 모니터링...
  // 현재 모든 폼 필드가 VDom 레벨에 있으므로 이렇게 모니터링 할 수 밖에 없다.
  // 방법 1: 컴포넌트 내 특정 위치에서 필드 값 확인
  const genreValue = watch("genre");
  console.log("현재 genre 값:", genreValue);
  const preferredDeviceValue = watch("preferredDevice");
  console.log("현재 preferredDevice 값:", preferredDeviceValue);

  const goPreviouse = () => {
    router.back();
  };

  const genreList = Object.entries(Genre).map(
    ([key, value]: [string, Genre]) => {
      return {
        key,
        value,
      };
    }
  );

  const preferredDeviceList = Object.entries(PreferredDevice).map(
    ([key, value]: [string, PreferredDevice]) => {
      return {
        key,
        value,
      };
    }
  );
  return (
    <View style={styles.container}>
      <Stepper currentStep={2} totalSteps={3} />
      {/* <Text className="text-2xl font-bold mb-4">User Preferences</Text> */}

      <View className="flex flex-row flex-wrap gap-4">
        <ExpoSelectTags
          control={control}
          inputName="genre"
          label="Genre"
          tagsData={genreList}
          onSelectChange={handleGenreSelect}
          selectedData={selectedGenres}
          setValue={setValue}
        />
      </View>

      <View className="flex flex-row flex-wrap gap-4">
        <ExpoSelectTags
          control={control}
          inputName="preferredDevice"
          label="Preferred Device"
          tagsData={preferredDeviceList}
          onSelectChange={handleDeviceSelect}
          selectedData={selectedDevices}
          setValue={setValue}
        />
      </View>

      <StepButtons
        step={step}
        goPreviouse={goPreviouse}
        stepSubmit={stepSubmit}
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
