import {
  View,
  Text,
  Image,
  useWindowDimensions,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import Logo from "../../../../assets/favicon.png";
import { CustomInput } from "../../components/CustomInput/CustomInput";
import { CustomButton } from "../../components/CustomButton/CustomButton";
import { useNavigation } from "@react-navigation/native";
import {useForm} from 'react-hook-form'

export const ConfirmEmailScreen = () => {

  const {control, handleSubmit} = useForm();


  const navigation= useNavigation();

  const onSignInPressed = () => {
    navigation.navigate("SignIn")
  };

  const onConfirmPressed = data => {
    console.warn(data);
    navigation.navigate('Home')
  };
  const onResendPressed = () => {
    console.warn("on Resend press");
  };
  return (
    <View style={styles.root}>
      <Text style={styles.title}> Confirm Your Email</Text>
      <CustomInput

      name="code"
      control={control}
        placeholder="Enter your confirmation code"
        rules={{
          required:'Confirmation code is require'
        }}
      />
      <CustomButton text="Confirm" onPress={handleSubmit(onConfirmPressed)} />

      <CustomButton
        text="Resend Code"
        onPress={onResendPressed}
        type="SECONDARY"
      />

      <CustomButton
        text="Back to Sign in"
        onPress={onSignInPressed}
        type="TERTIARY"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    padding: 20,
  },
  logo: {
    width: "70%",
    maxWidth: 300,
    maxHeight: 200,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#051C60",
    margin: 10,
  },
  text: {
    color: "gray",
    marginVertical: 10,
  },
  link: {
    color: "#FDB075",
  },
});
