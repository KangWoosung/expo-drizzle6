// zustand 의 전역 오브젝트를 localStorage 에 동시에 저장하는 persist 미들웨어 사용
import { create } from "zustand";
// import { persist, createJSONStorage } from "zustand/middleware";
import { persist, createJSONStorage } from "expo-zustand-persist";
import { useEffect, useState } from "react";
import { FullFormSchemaType } from "@/zod-schemas/formdata";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MMKV } from "react-native-mmkv";

// ✅ 1. Zustand Store (localStorage 저장 기능 추가)
type FormStore = {
  formData: Record<string, any>;
  updateStepData: (step: number, data: FullFormSchemaType) => void;
  resetForm: () => void;
};

// persist 메서드 사용
// persist 는 두개의 인수를 받습니다: zustand 펑션과 storage options
const useFormStore = create<FormStore>()(
  persist(
    (set) => ({
      formData: {} as FullFormSchemaType, // 기본 폼 데이터
      updateStepData: (step: number, data: FullFormSchemaType) =>
        set((state) => ({
          formData: { ...state.formData, data },
        })),
      resetForm: () => set({ formData: {} }), // 폼 데이터 초기화
    }),
    {
      name: "multi-step-form", // localStorage 저장 키
      storage: createJSONStorage(() => AsyncStorage), // Storage 의 종류 지정
    }
  )
);

export { useFormStore };
