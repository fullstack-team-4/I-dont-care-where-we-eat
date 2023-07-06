import React from "react";
import { Image, StyleSheet } from "react-native";

const Logo = () => {
  return (
    <Image
      style={styles.logoStyle}
      source={require("../../../assets/IDC_Logo.png")}
      resizeMode="contain"
    />
  );
};

const styles = StyleSheet.create({
  logoStyle: {
    width: 100,
    height: 55,
  },
});

export default Logo;
