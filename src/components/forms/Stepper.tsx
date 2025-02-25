/*
2025-02-16 10:52:40

Ref:
https://medium.com/@amolakapadi/horizontal-stepper-component-with-dynamic-styling-in-react-native-49e96ca0cd51

2025-02-16 10:57:28
다른 프로젝트에서도 써먹을 수 있도록 Tailwind 도 넣고 cva 커스터마이징도 되도록 추가작업해놓을 것..

*/

import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const Stepper = () => {
  const [activeStep, setActiveStep] = useState(1);

  const renderStep = (step: number) => {
    const isActive = activeStep >= step;

    return (
      <View key={step} style={styles.stepWrapper}>
        <View
          style={[styles.line, isActive ? styles.activeLine : styles.line]}
        />
        <TouchableOpacity
          onPress={() => setActiveStep(step)}
          style={styles.circleWrapper}
        >
          <View style={[styles.circle, isActive && styles.activeCircle]}>
            <Text style={[styles.label, isActive && styles.activeLabel]}>
              {step}
            </Text>
          </View>
        </TouchableOpacity>
        <View
          style={[styles.line, isActive ? styles.activeLine : styles.line]}
        />
      </View>
    );
  };

  const renderContent = () => {
    switch (activeStep) {
      case 1:
        return <Text style={styles.card}>This is step 1 content</Text>;
      case 2:
        return <Text style={styles.card}>This is step 2 content</Text>;
      case 3:
        return <Text style={styles.card}>This is step 3 content</Text>;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <Text>Touchable Stepper</Text>
      <View style={styles.stepContainer}>
        {renderStep(1)}
        {renderStep(2)}
        {renderStep(3)}
      </View>
      <View style={styles.contentContainer}>{renderContent()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 20,
    marginTop: 20,
  },
  stepContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    marginVertical: 20,
  },
  stepWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  circleWrapper: {
    zIndex: 1,
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  activeCircle: {
    backgroundColor: "blue",
  },
  label: {
    color: "white",
    fontWeight: "bold",
  },
  activeLabel: {
    color: "white",
  },
  line: {
    width: 40,
    height: 2,
    backgroundColor: "black",
    zIndex: 0,
  },
  activeLine: {
    backgroundColor: "blue",
  },
  contentContainer: {
    alignItems: "center",
  },
  card: {
    fontSize: 16,
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
  },
});

export default Stepper;
