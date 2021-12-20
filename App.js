import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Header } from "./components/Header";
import { GameOverScreen } from "./screen/GameOverScreen";
import { GameScreen } from "./screen/GameScreen";
import { StartGameScreen } from "./screen/StartGameScreen";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";

const loadFonts = () => {
  return Font.loadAsync({
    "OpenSans-Bold": require("./assets/fonts/OpenSans-Bold.ttf"),
    OpenSans: require("./assets/fonts/OpenSans-Regular.ttf"),
  });
};
export default function App() {
  const [uesrNumer, setUserNumber] = React.useState();
  const [guessRound, setGuessRound] = React.useState(0);
  const [fontsLoading, setFontsLoading] = React.useState(false);

  if (!fontsLoading) {
    return (
      <AppLoading
        startAsync={loadFonts}
        onFinish={() => setFontsLoading(true)}
        onError={console.warn}
      />
    );
  }

  const startGameHandler = (selectedNumber) => {
    setUserNumber(selectedNumber);
    setGuessRound(0);
  };
  const gameOverHandler = (numberOfRounds) => {
    setGuessRound(numberOfRounds);
  };

  const restGame = () => {
    setGuessRound(0);
    setUserNumber(null);
  };

  let content = <StartGameScreen onStartGame={startGameHandler} />;
  if (uesrNumer && guessRound <= 0) {
    content = (
      <GameScreen userChoice={uesrNumer} onGameOver={gameOverHandler} />
    );
  } else if (guessRound > 0) {
    content = (
      <GameOverScreen
        uesrNumer={uesrNumer}
        guessRound={guessRound}
        restGame={restGame}
      />
    );
  }
  const t = (
    <GameOverScreen
      uesrNumer={uesrNumer}
      guessRound={guessRound}
      restGame={restGame}
    />
  );
  return (
    <View style={styles.container}>
      <Header title="Guess A Number" />
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
