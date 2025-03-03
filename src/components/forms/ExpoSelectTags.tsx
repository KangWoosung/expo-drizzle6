import React, { useEffect, useState } from "react";
import { Control, Controller } from "react-hook-form";
import { View, StyleSheet, Text, TextInput } from "react-native";
import { Checkbox } from "./CheckboxAnimated";

type ExpoSelectTagsProps = {
  control: Control<any>;
  label?: string;
  inputName: string;
  tagsData: { key: string; value: string }[];
  selectedData: string[];
  onSelectChange: (genreName: string, isSelected: boolean) => void;
  setValue?: any;
};

export const ExpoSelectTags = ({
  control,
  label,
  inputName,
  tagsData,
  selectedData,
  onSelectChange,
  setValue,
}: ExpoSelectTagsProps) => {
  const [selectedTags, setSelectedTags] = useState<string[]>(
    selectedData || []
  );

  // selectedData prop이 변경될 때 상태 업데이트를 위한 useEffect 추가
  useEffect(() => {
    console.log(`${inputName} selectedData 변경됨:`, selectedData);
    setSelectedTags(selectedData || []);
  }, [selectedData, inputName]);

  console.log("### selectedTags", selectedTags);

  // 체크박스 클릭 시 이벤트 핸들러
  const handleCheckboxClick = (
    tag: string,
    onChange?: (value: any) => void
  ) => {
    // 이미 선택된 태그인지 확인
    const isCurrentlySelected = selectedTags.includes(tag);
    // 토글하여 새 상태 결정
    const newSelected = !isCurrentlySelected;
    console.log("현재 선택 상태:", tag, isCurrentlySelected, "→", newSelected);

    // 새로운 선택된 태그 배열 생성
    const newSelectedTags = newSelected
      ? [...selectedTags, tag] // 추가
      : selectedTags.filter((item) => item !== tag); // 제거

    // 로컬 상태 업데이트
    setSelectedTags(newSelectedTags);

    // 부모 컴포넌트에 알림
    if (onSelectChange) {
      onSelectChange(tag, newSelected);
    }

    // React Hook Form의 onChange 호출 - 이게 에러 상태를 업데이트하는 핵심!
    if (onChange) {
      onChange(newSelectedTags);
    }

    // RHF 폼 값 업데이트 (이 부분은 onChange가 있다면 필요 없을 수 있음)
    if (setValue) {
      setValue(inputName, newSelectedTags);
    }
  };

  return (
    <View className="flex flex-row flex-wrap gap-4 p-4">
      <Controller
        control={control}
        name={inputName}
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error },
        }) => (
          <View>
            <Text className="text-xl text-secondary mb-4">{label || ""}</Text>
            <View className="flex flex-row flex-wrap gap-4">
              {tagsData.map((tag) => (
                <Checkbox
                  key={tag.key}
                  label={tag.value}
                  checked={selectedTags.includes(tag.key)}
                  onPress={() => handleCheckboxClick(tag.key, onChange)}
                />
              ))}
            </View>
            {error && <Text style={styles.error}>{error.message}</Text>}
          </View>
        )}
      />
    </View>
  );
};

/*

    const newSelected = !selected;

    if (onSelectChange) {
      onSelectChange(inputName, newSelected);
    }

    if (newSelected) {
      setSelectedGenres([...selectedGenres, inputName]);
    } else {
      setSelectedGenres(selectedGenres.filter((genre) => genre !== inputName));
    }

          <View>
            <Checkbox
              label={label || ""}
              checked={selected}
              onPress={handlePress}
            />
            {error && <Text style={styles.msg}>{error.message}</Text>}
          </View>

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
  error: {
    color: "#ff8566",
    marginTop: 5,
  },
});
