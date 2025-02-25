/*
2025-02-18 16:18:19


*/

import { View, StyleSheet } from "react-native";

export function FormGroup({
  errorMessage = "",
  children,
}: {
  errorMessage: string;
  children: React.ReactNode;
}) {
  return (
    <View className={`form-group ${errorMessage.length > 0 ? "error" : ""}`}>
      {children}
      {errorMessage.length > 0 ? (
        <View className="msg">{errorMessage}</View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  formGroup: {
    marginBottom: 10,
  },
  msg: {
    color: "red",
  },
});
