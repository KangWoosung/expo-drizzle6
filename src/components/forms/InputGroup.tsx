/*
2025-02-18 16:18:19


*/

import React from "react";
import { Control, Controller } from "react-hook-form";
import { View, StyleSheet, Text } from "react-native";

type InputGroupProps = {
  control: Control<any>;
  name: string;
  children: React.ReactNode;
};

export function InputGroup({ control, name, children }: InputGroupProps) {
  return (
    <View style={styles.formGroup}>
      <Controller
        control={control}
        name={name}
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error },
        }) => (
          <View>
            {React.cloneElement(children as React.ReactElement, {
              onChange,
              onBlur,
              value,
              style: [
                (children as React.ReactElement).props.style,
                error && styles.errorInput,
              ],
            })}
            {error && <Text style={styles.msg}>{error.message}</Text>}
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  formGroup: {
    marginBottom: 10,
  },
  msg: {
    color: "#ff8566",
    marginTop: 5,
  },
  errorInput: {
    borderColor: "#ff8566",
    borderWidth: 1,
  },
});
