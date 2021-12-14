import React from "react";
import { TextInput, StyleSheet } from "react-native";

export const Input = (props) => {
  return <TextInput {...props} style={{ ...style.input, ...props.style }} />;
};

const style = StyleSheet.create({
  input: {
    height: 30,
    borderBottomColor: "gray",
    borderBottomWidth: 1,
    marginVertical: 10,
  },
});
