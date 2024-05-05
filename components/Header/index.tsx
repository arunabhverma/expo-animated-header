import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";

const Header = ({ ...props }) => {
  const theme = useTheme();

  const HeaderTitle = ({ title }) => {
    return <Text style={styles.headerTitle}>{title}</Text>;
  };
  return (
    <SafeAreaView
      style={[styles.headerContainer, { backgroundColor: theme.colors.card }]}
    >
      <View style={styles.itemContainer}>
        {props.back && (
          <Pressable
            style={styles.headerButton}
            android_ripple={{ foreground: true, borderless: true }}
            onPress={() => props.navigation.goBack()}
          >
            <MaterialCommunityIcons name="arrow-left" size={24} color="black" />
          </Pressable>
        )}
        <HeaderTitle title={props.options?.title || props.route.name} />
      </View>
      <View style={styles.itemContainer}></View>
      <View style={styles.itemContainer}></View>
    </SafeAreaView>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  itemContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 20,
  },
  headerButton: {
    marginRight: 30,
  },
});
