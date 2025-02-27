/*
2025-02-18 16:18:19


*/

import React from "react";
import { Control, Controller } from "react-hook-form";
import { View, StyleSheet, Text, TextInput } from "react-native";

type ExpoTextInputProps = {
  control: Control<any>;
  inputName: string;
  label?: string;
  placeholder?: string;
  //   setInputValue: (value: string) => void;
  defaultValue?: string;
};

export function ExpoTextInput({
  control,
  inputName,
  label,
  placeholder,
  //   setInputValue,
  defaultValue,
}: ExpoTextInputProps) {
  return (
    <View style={styles.formGroup}>
      {label && <Text>{label}</Text>}
      <Controller
        control={control}
        name={inputName}
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error },
        }) => (
          <View>
            <TextInput
              style={[styles.input, error && styles.errorInput]}
              placeholder={placeholder}
              onChangeText={(text: string) => {
                // setInputValue(text);
                onChange(text);
              }}
              value={value || defaultValue}
              onBlur={onBlur}
            />
            {error && <Text style={styles.msg}>{error.message}</Text>}
          </View>
        )}
      />
    </View>
  );
}

/*
React Native의 TextInput에서는 Tailwind CSS의 className 속성이 CSS 변수를 직접 처리하지 못합니다.
React Native는 웹과 달리 CSS 변수를 네이티브로 지원하지 않기 때문입니다.
대신 StyleSheet에서 색상 값을 직접 사용하거나, 전역 스타일 상수를 만들어 사용해야 합니다.
*/
const styles = StyleSheet.create({
  formGroup: {
    marginBottom: 10,
  },
  msg: {
    color: "#ff8566",
    marginTop: 5,
  },
  input: {
    marginVertical: 10,
    borderWidth: 2,
    borderColor: "#aeaeae",
    padding: 12,
    borderRadius: 6,
    fontSize: 16,
  },
  errorInput: {
    borderColor: "#ff8566",
    borderWidth: 1,
  },
});
