import React from "react";
import { Text, View, Button, StyleSheet, Alert } from "react-native";
import { Card } from "../components/Card";
import { MainButton } from "../components/MainButton";
import { NumberContainer } from "../components/NumberContainer";
import { Ionicons } from "@expo/vector-icons";
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

  const [round, setRound] = React.useState(0);
  const currentLow = React.useRef(1);
  const currentHigh = React.useRef(100);

  const { userChoice, onGameOver } = props;

  React.useEffect(() => {
    if (currentGuess === userChoice) {
      onGameOver(round);
    }
  }, [currentGuess, userChoice, onGameOver]);

  const nextGuessNumber = (direction) => {
    if (
      (direction === "lower" && currentGuess < userChoice) ||
      (direction === "greater" && currentGuess > userChoice)
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
    setRound((currentRound) => currentRound + 1);
  };

  return (
    <View style={styles.screen}>
      <Text>Opponent's Guess!</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <MainButton
          onPress={() => {
            nextGuessNumber("lower");
          }}
        >
          <Ionicons name="md-remove" color={"white"} size={24} />
        </MainButton>

        <MainButton
          onPress={() => {
            nextGuessNumber("greater");
          }}
        >
          <Ionicons name="md-add" color={"white"} size={24} />
        </MainButton>
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
    maxWidth: "90%",
  },
});
