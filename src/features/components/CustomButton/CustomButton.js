import { Text, View, StyleSheet, Pressable } from "react-native";
import React from "react";

export const CustomButton = ({
  onPress,
  text,
  type = "PRIMARY",
  bgColor,
  fgColor,
}) => {
  return (
    <Pressable
       style={[
        styles.container,
        styles[`container_${type}`],
        bgColor ? { backgroundColor: bgColor } : {},
      ]}
      onPress={onPress}
    >
      <Text
        style={[
          styles.text,
          styles[`text_${type}`],
          fgColor ? { color: fgColor } : {},
        ]}
      >
        {text}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",

    padding: 15,
    marginVertical: 5,

    alignItems: "center",
    borderRadius: 5,
  },
  container_PRIMARY: {
    backgroundColor: "#3B71F3",
  },
  container_SECONDARY:{
    borderColor:"#3B71F3",
    borderWidth:2,
  }
  ,
  container_TERTIARY: {},

  text: {
    fontWeight: "bold",
    color: "white",
  },
  text_SECONDARY:{
    color:"#3B71F3",

  },
  text_TERTIARY: {
    color: "gray",
  },
});
