import React from "react";
import { TextInput, StyleSheet } from "react-native";

export const Input = (props) => {
  const keyBoardRef = React.useRef(null);
  React.useEffect(() => {
    keyBoardRef.current.focus();
  }, []);
  return (
    <TextInput
      ref={keyBoardRef}
      {...props}
      style={{ ...style.input, ...props.style }}
    />
  );
};

const style = StyleSheet.create({
  input: {
    height: 30,
    borderBottomColor: "gray",
    borderBottomWidth: 1,
    marginVertical: 10,
  },
});
