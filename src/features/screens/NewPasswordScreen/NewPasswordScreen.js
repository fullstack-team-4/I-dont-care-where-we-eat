import {
  View,
  Text,
Alert,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";

import { CustomInput } from "../../components/CustomInput/CustomInput";
import { CustomButton } from "../../components/CustomButton/CustomButton";
import { useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import { Auth } from "aws-amplify";
export const NewPasswordScreen = () => {
  const { control, handleSubmit } = useForm();

  const navigation = useNavigation();

  const onSignInPressed = () => {
    navigation.navigate("SignIn");
  };

  const onSubmitPressed = async(data) => {
    try{
      await Auth.forgotPasswordSubmit(data.username,data.code, data.password);
      navigation.navigate("SignIn")

    }
    catch(e){
      Alert.alert("Oops", e.message)
    }
   
  };

  return (
    <View style={styles.root}>
      <Text style={styles.title}> Reset your Password</Text>
      <CustomInput
        placeholder="Username"
        name="username"
        control={control}
        rules={{ required: "Username is required" }}
      />

      <CustomInput
        placeholder="Code"
        name="code"
        control={control}
        rules={{ required: "Code is required" }}
      />
      <CustomInput
        placeholder={"Enter your new password"}
        name="password"
        control={control}
        secureTextEntry
        rules={{
          require: "Password is required",
          minLength: {
            value: 8,
            message: "Password should be at least 8 characters long",
          },
        }}
      />

      <CustomButton text="Submit" onPress={handleSubmit(onSubmitPressed)} />

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
    flex:1,
    alignItems: "center",
    justifyContent: "center",
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
