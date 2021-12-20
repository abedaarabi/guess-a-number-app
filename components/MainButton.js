import React from "react";
import { TouchableOpacity, Text, View, StyleSheet } from "react-native";
import Color from "../constants/Color";

export const MainButton = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={styles.button}>
        <Text style={styles.text}>{props.children}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: Color.accent,
    padding: 20,
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 20,
  },
  text: {
    color: "white",
  },
});
