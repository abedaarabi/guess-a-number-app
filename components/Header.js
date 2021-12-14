import React from "react";

import { Text, View, StyleSheet } from "react-native";

export const Header = (props) => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>{props.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#C06C84",
    paddingTop: 20,
    width: "100%",
    height: 80,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    color: "#ffffff",
    fontSize: 18,
  },
});
