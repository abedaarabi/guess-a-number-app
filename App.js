import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Header } from "./components/Header";
import { GameScreen } from "./screen/GameScreen";
import { StartGameScreen } from "./screen/StartGameScreen";

export default function App() {
  const [uesrNumer, setUserNumber] = React.useState();
  const startGameHandler = (selectedNumber) => {
    setUserNumber(selectedNumber);
  };
  return (
    <View style={styles.container}>
      <Header title="Guess A Number" />
      {uesrNumer ? (
        <GameScreen userChoice={uesrNumer} />
      ) : (
        <StartGameScreen onStartGame={startGameHandler} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
