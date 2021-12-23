import React from "react";
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  Alert,
  Dimensions,
} from "react-native";
import { Card } from "../components/Card";
import { MainButton } from "../components/MainButton";
import { NumberContainer } from "../components/NumberContainer";
import { Ionicons } from "@expo/vector-icons";
import { BodyText } from "../components/BodyText";
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

const renderdList = (value, numOfRound) => (
  <View key={value * Date.now() - numOfRound * 9.8} style={styles.listItem}>
    <BodyText>#{numOfRound}</BodyText>
    <BodyText>{value}</BodyText>
  </View>
);
export const GameScreen = (props) => {
  const [currentGuess, setCurrentGuess] = React.useState(
    generateRandomBetween(1, 100, props.userChoice)
  );

  const [round, setRound] = React.useState([
    generateRandomBetween(1, 100, props.userChoice),
  ]);
  const [availavleDeviceWidth, setAvailableDeviceWidth] = React.useState(
    Dimensions.get("window").width
  );
  const [availavleDeviceHeight, setAvailableDeviceHeight] = React.useState(
    Dimensions.get("window").height
  );
  const currentLow = React.useRef(1);
  const currentHigh = React.useRef(100);

  const { userChoice, onGameOver } = props;

  React.useEffect(() => {
    if (currentGuess === userChoice) {
      onGameOver(round.length);
    }
  }, [currentGuess, userChoice, onGameOver]);

  React.useEffect(() => {
    const updateDimantions = () => {
      setAvailableDeviceHeight(Dimensions.get("window").height);
      setAvailableDeviceWidth(Dimensions.get("window").width);
    };
    Dimensions.addEventListener("change", updateDimantions);

    return () => {
      Dimensions.removeEventListener("change", updateDimantions);
    };
  });

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
      currentLow.current === currentGuess + 1;
    }
    const nextNum = generateRandomBetween(
      currentLow.current,
      currentHigh.current,
      currentGuess
    );
    setCurrentGuess(nextNum);
    setRound((currentRound) => [nextNum, ...currentRound]);
  };
  let listContinterStyle = styles.listContainter;
  if (availavleDeviceWidth < 350) {
    listContinterStyle = styles.listContainterBig;
  }

  if (availavleDeviceHeight < 500) {
    return (
      <View style={styles.screen}>
        <Text>Opponent's Guess!</Text>
        <View style={styles.control}>
          <MainButton
            onPress={() => {
              nextGuessNumber("lower");
            }}
          >
            <Ionicons name="md-remove" color={"white"} size={24} />
          </MainButton>

          <NumberContainer>{currentGuess}</NumberContainer>
          <MainButton
            onPress={() => {
              nextGuessNumber("greater");
            }}
          >
            <Ionicons name="md-add" color={"white"} size={24} />
          </MainButton>
        </View>
        <View style={styles.listContainter}>
          <ScrollView contentContainerStyle={styles.list}>
            {round.map((num, idx) => renderdList(num, round.length - idx))}
          </ScrollView>
        </View>
      </View>
    );
  }

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
      <View style={styles.listContainter}>
        <ScrollView contentContainerStyle={styles.list}>
          {round.map((num, idx) => renderdList(num, round.length - idx))}
        </ScrollView>
      </View>
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
    marginTop: Dimensions.get("window").height > 600 ? 20 : 10,
    maxWidth: "90%",
  },
  control: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "80%",
  },
  listItem: {
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 15,
    marginVertical: 10,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },
  listContainter: {
    flex: 1,
    width: Dimensions.get("window").width > 350 ? "60%" : "80%",
  },
  listContainterBig: {
    flex: 1,
    width: Dimensions.get("window").width > 350 ? "60%" : "80%",
  },
  list: {
    flexGrow: 1,
    justifyContent: "flex-end",
  },
});
