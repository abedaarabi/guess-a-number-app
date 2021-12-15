import React from "react";

import {
  Text,
  View,
  StyleSheet,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import { Card } from "../components/Card";
import { Input } from "../components/Input";
import { NumberContainer } from "../components/NumberContainer";
import Color from "../constants/Color";

export const StartGameScreen = (props) => {
  const [inputTextValue, setInputTextValue] = React.useState("");
  const [confirmed, setConfirmed] = React.useState(false);
  const [selectedNumber, setSelectedNumber] = React.useState();

  const numberInputHander = (inputText) => {
    setInputTextValue(inputText.replace(/[^0-9]/g, ""));
  };

  const restButtonHandler = () => {
    setInputTextValue("");
    setConfirmed(false);
  };

  const confirmedButtonHandler = () => {
    const chosenNumber = parseInt(inputTextValue);
    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert("Invalid number", " number should be between 0 and 99", [
        { text: "okay", style: "destructive", onPress: restButtonHandler },
      ]);
      return;
    }
    setConfirmed(true);
    setSelectedNumber(chosenNumber);
    setInputTextValue("");
    Keyboard.dismiss();
  };

  let confirmedNumber;

  if (confirmed) {
    confirmedNumber = (
      <Card style={styles.summaryContainer}>
        <Text style={{ color: Color.gray }}>You Selected</Text>
        <NumberContainer>{selectedNumber}</NumberContainer>
        <Button
          title="START GAME"
          onPress={() => {
            props.onStartGame(selectedNumber);
          }}
        />
      </Card>
    );
  }
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
              <Button
                title="Rest"
                onPress={restButtonHandler}
                color={Color.accent}
              />
            </View>
            <View style={styles.button}>
              <Button
                title="Confirm"
                onPress={confirmedButtonHandler}
                color={Color.primary}
              />
            </View>
          </View>
        </Card>
        {confirmedNumber}
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
    marginVertical: 10,
  },
  button: {
    width: "40%",
  },
  input: {
    width: "40%",
    textAlign: "center",
  },
  summaryContainer: {
    marginTop: 20,
    alignItems: "center",
  },
});
