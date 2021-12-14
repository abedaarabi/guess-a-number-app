import React from "react";

import { Text, View, StyleSheet, TextInput, Button } from "react-native";
import { Card } from "../components/Card";
import Color from "../constants/Color";

export const StartGameScreen = (props) => {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Start a New Game!</Text>
      <Card style={styles.inputContanier}>
        <Text style={styles.textSelectNumber}>Select a Number</Text>
        <TextInput />
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button title="Rest" onPress={() => {}} color={Color.accent} />
          </View>
          <View style={styles.button}>
            <Button title="Confirm" onPress={() => {}} color={Color.primary} />
          </View>
        </View>
      </Card>
    </View>
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
    backgroundColor: "#6C5B7B",
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
});
