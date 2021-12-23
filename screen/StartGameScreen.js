import React, { useRef } from "react";

import {
  Text,
  View,
  StyleSheet,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  Dimensions,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { Card } from "../components/Card";
import { Input } from "../components/Input";
import { MainButton } from "../components/MainButton";
import { NumberContainer } from "../components/NumberContainer";
import Color from "../constants/Color";

export const StartGameScreen = (props) => {
  const [inputTextValue, setInputTextValue] = React.useState("");
  const [confirmed, setConfirmed] = React.useState(false);
  const [selectedNumber, setSelectedNumber] = React.useState();
  const [buttonWidth, setButtonWidth] = React.useState(
    Dimensions.get("window").width / 4
  );

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

  React.useEffect(() => {
    const updateWidth = () => {
      setButtonWidth(Dimensions.get("window").width / 4);
    };
    Dimensions.addEventListener("change", updateWidth);

    return () => {
      Dimensions.removeEventListener("change", updateWidth);
    };
  });
  let confirmedNumber;

  if (confirmed) {
    confirmedNumber = (
      <Card style={styles.summaryContainer}>
        <Text style={{ color: Color.gray }}>You Selected</Text>
        <NumberContainer>{selectedNumber}</NumberContainer>
        <MainButton
          onPress={() => {
            props.onStartGame(selectedNumber);
          }}
        >
          START GAME
        </MainButton>
      </Card>
    );
  }

  return (
    <ScrollView>
      <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={30}>
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss();
          }}
        >
          <View style={styles.screen}>
            <Text style={styles.title}>Start a New Baher!</Text>
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
                <View style={{ width: buttonWidth }}>
                  <Button
                    title="Rest"
                    onPress={restButtonHandler}
                    color={Color.accent}
                  />
                </View>
                <View style={{ width: buttonWidth }}>
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
      </KeyboardAvoidingView>
    </ScrollView>
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
    fontFamily: "OpenSans-Bold",
  },
  textSelectNumber: { color: "#ffff" },
  inputContanier: {
    backgroundColor: "#45ADA8",
    width: "80%",
    minWidth: 300,
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    maxWidth: "90%",
    width: "80%",
    minWidth: 300,
    justifyContent: "space-around",
    marginVertical: 10,
  },
  button: {
    width: Dimensions.get("window").width / 3.5,
  },
  input: {
    width: "30%",
    textAlign: "center",
  },
  summaryContainer: {
    marginTop: 20,
    alignItems: "center",
  },
});
