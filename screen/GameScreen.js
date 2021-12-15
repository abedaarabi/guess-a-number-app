import React from "react";
import { Text, View, Button, StyleSheet, Alert } from "react-native";
import { Card } from "../components/Card";
import { NumberContainer } from "../components/NumberContainer";

const generateRandomBetween = (min, max, exclude) => {
  min = Math.min(min);
  max = Math.floor(max);
  const randomNum = Math.floor(Math.random() * (max - min) + min);

  if (randomNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return randomNum;
  }
};

export const GameScreen = (props) => {
  const [currentGuess, setCurrentGuess] = React.useState(
    generateRandomBetween(1, 100, props.userChoice)
  );

  const currentLow = React.useRef(1);
  const currentHigh = React.useRef(100);

  const nextGuessNumber = (direction) => {
    if (
      (direction === "lower" && currentGuess < props.userChoice) ||
      (direction === "greater" && currentGuess > props.userChoice)
    ) {
      Alert.alert("Don't Lie", "The Guessed Number is Wrong! ", [
        { text: "cancel", style: "cancel" },
      ]);
      return;
    }
    if (direction === "lower") {
      currentHigh.current === currentGuess;
    } else {
      currentLow.current === currentGuess;
    }
    const nextNum = generateRandomBetween(
      currentLow.current,
      currentHigh.current,
      currentGuess
    );
    setCurrentGuess(nextNum);
  };

  return (
    <View style={styles.screen}>
      <Text>Opponent's Guess!</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <Button
          title="LOWER"
          onPress={() => {
            nextGuessNumber("lower");
          }}
        />
        <Button
          title="GREATER"
          onPress={() => {
            nextGuessNumber("greater");
          }}
        />
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
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: 300,
    marginTop: 20,
    maxWidth: "80%",
  },
});
