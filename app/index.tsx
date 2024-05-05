import { StyleSheet, View, Button } from "react-native";
import React from "react";
import { router } from "expo-router";

const Main = () => {
  return (
    <View style={styles.container}>
      <Button title={"Home"} onPress={() => router.push("/(home)")} />
    </View>
  );
};

export default Main;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
