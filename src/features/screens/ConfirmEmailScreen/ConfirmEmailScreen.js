import {
  View,
  Text,
  Image,
  useWindowDimensions,
  StyleSheet,
  Alert
} from "react-native";
import React, { useState } from "react";
import Logo from "../../../../assets/favicon.png";
import { CustomInput } from "../../components/CustomInput/CustomInput";
import { CustomButton } from "../../components/CustomButton/CustomButton";
import { useNavigation } from "@react-navigation/native";
import {useForm} from 'react-hook-form'
import {Auth} from "aws-amplify"
import {useRoute} from '@react-navigation/native'

export const ConfirmEmailScreen = () => {
  const route = useRoute();
  const {control, handleSubmit,watch} = useForm({defaultValues:{username:route?.params?.username}});

  const username= watch('username')


  const navigation= useNavigation();

  const onSignInPressed = () => {
    navigation.navigate("SignIn")
  };

  const onConfirmPressed = async data => {
    try{
    await Auth.confirmSignUp(data.username, data.code)
      navigation.navigate('SignIn')
    } catch(e){
      Alert.alert("Oops", e.message)
    }
    
  };
  const onResendPressed = async() => {
    try{
      await Auth.resendSignUp(username)
      Alert.alert("Succcess","Code was resent to you email")
        
      } catch(e){
        Alert.alert("Oops", e.message)
      }
  };
  return (
    <View style={styles.root}>
      <Text style={styles.title}> Confirm Your Email</Text>

      <CustomInput
          name="username"
          control={control}
          placeholder="Username"
          rules={{
            required: 'Username code is required',
          }}
        />
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
