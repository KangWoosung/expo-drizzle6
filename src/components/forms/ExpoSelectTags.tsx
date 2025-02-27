import React, { useState } from "react";
import { Control, Controller } from "react-hook-form";
import { View, StyleSheet, Text, TextInput } from "react-native";
import { Checkbox } from "./CheckboxAnimated";

type ExpoSelectTagsProps = {
  control: Control<any>;
  inputName: string;
  label?: string;
  placeholder?: string;
  defaultValue?: number;
};

export const ExpoSelectTags = ({
  control,
  inputName,
  label,
  placeholder,
  defaultValue,
}: ExpoSelectTagsProps) => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  return (
    <View>
      <Controller
        control={control}
        name={inputName}
        render={({ field }) => (
          <Checkbox
            label={label || ""}
            checked={field.value}
            onPress={() => field.onChange(!field.value)}
          />
        )}
      />
    </View>
  );
};
