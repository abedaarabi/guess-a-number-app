import React from "react";

import { Text, StyleSheet, View } from "react-native";
import Color from "../constants/Color";

export const NumberContainer = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{props.children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: Color.accent,
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: Color.primary,
    fontSize: 15,
  },
});
