import React from "react";
import { View, Image, StyleSheet, Button, Text } from "react-native";
import { BodyText } from "../components/BodyText";
import { Card } from "../components/Card";
import Color from "../constants/Color";

export const GameOverScreen = (props) => {
  const { uesrNumer, guessRound, restGame } = props;
  return (
    <View style={styles.secreen}>
      <BodyText style={styles.title}>The Game Is Over..!</BodyText>
      <View style={styles.imageContainer}>
        <Image
          //web
          source={{
            uri: "https://dm0qx8t0i9gc9.cloudfront.net/thumbnails/video/HGATaVJubj6casdeu/videoblocks-businesswoman-with-success-flag-character-animated-4k-video-animation_byluppjjw_thumbnail-1080_01.png",
          }}
          //loacl
          /* <Image source={require("../assets/success.png")}  */
          style={styles.image}
        />
      </View>
      <View style={styles.resultContainer}>
        <BodyText style={styles.textBody}>
          Number of Round :
          <Text style={styles.textHighlight}> {guessRound}</Text> User Numner:
          <Text style={styles.textHighlight}> {uesrNumer}</Text>
        </BodyText>
      </View>

      <Button onPress={restGame} title="NEW GAME" color={Color.accent} />
    </View>
  );
};

const styles = StyleSheet.create({
  secreen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  summaryContainer: {
    width: 300,
    height: 200,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontFamily: "OpenSans-Bold",
  },
  imageContainer: {
    width: 300,
    height: 300,
    borderRadius: 150,
    borderWidth: 3,
    marginVertical: 30,
    overflow: "hidden",
    borderColor: Color.primary,
  },
  image: {
    height: "100%",
    width: "100%",
  },
  textHighlight: {
    fontFamily: "OpenSans-Bold",
    color: Color.accent,
  },
  resultContainer: {
    width: "80%",
    marginVertical: 20,
  },
  textBody: {
    textAlign: "center",
  },
});
