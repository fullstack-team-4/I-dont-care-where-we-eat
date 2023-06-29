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
import { SocialSignInButtons } from "../../components/SocialSignInButtons/SocialSignInButtons";
import { useNavigation } from "@react-navigation/native";
import {useForm}  from 'react-hook-form'

export const ForgotPasswordScreen = () => {
  
  const {control, handleSubmit} = useForm();

  const navigation = useNavigation();

  const onSignInPressed = () => {
    navigation.navigate("SignIn")
  };

  const onSendPressed = () =>{
    console.warn(data)
    navigation.navigate("NewPassword")
  }
  return (
    <View style={styles.root}>
      <Text style={styles.title}> Reset your Password</Text>
      <CustomInput
        name="username"
        control={control}
        placeholder="Username"
        rules={{
          required:'Username is required'
        }}
      />
      
      <CustomButton
        text="Send"
        onPress={handleSubmit(onSendPressed)}
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
