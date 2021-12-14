import React from "react";

import {
  Text,
  View,
  StyleSheet,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Card } from "../components/Card";
import { Input } from "../components/Input";
import Color from "../constants/Color";

export const StartGameScreen = (props) => {
  const [inputTextValue, setInputTextValue] = React.useState("");

  const numberInputHander = (inputText) => {
    setInputTextValue(inputText.replace(/[^1-9]/g, ""));
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={styles.screen}>
        <Text style={styles.title}>Start a New Game!</Text>
        <Card style={styles.inputContanier}>
          <Text style={styles.textSelectNumber}>Select a Number</Text>
          <Input
            style={styles.input}
            keyboardType="numeric"
            maxLength={2}
            autoCorrect={false}
            autoCapitalize="none"
            onChangeText={numberInputHander}
            value={inputTextValue}
          />
          <View style={styles.buttonContainer}>
            <View style={styles.button}>
              <Button title="Rest" onPress={() => {}} color={Color.accent} />
            </View>
            <View style={styles.button}>
              <Button
                title="Confirm"
                onPress={() => {}}
                color={Color.primary}
              />
            </View>
          </View>
        </Card>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    marginVertical: 10,
    color: "#355C7D",
  },
  textSelectNumber: { color: "#ffff" },
  inputContanier: {
    backgroundColor: "#45ADA8",
    width: 300,
    maxWidth: "80%",
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    width: "80%",
    justifyContent: "space-between",
  },
  button: {
    width: "40%",
    backgroundColor: "red",
  },
  input: {
    width: "40%",
    textAlign: "center",
  },
});
