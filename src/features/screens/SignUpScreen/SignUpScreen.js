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
import { SocialSignInButtons } from "../../components/SocialSignInButtons/SocialSignInButtons";
import { useNavigation } from "@react-navigation/native";
import {useForm}  from 'react-hook-form'
import {Auth} from 'aws-amplify'

const EMAIL_REGEX = /^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$/

export const SignUpScreen = () => {
  const {control, handleSubmit, watch} = useForm()
  const pwd = watch('password')
  
  const navigation = useNavigation();

  const onRegisterPressed = async(data) => {
    const {username, password, email,name} = data;
    try{
       await Auth.signUp({
        username,
        password,
        attributes:{email,name}
      });
      navigation.navigate("ConfirmEmail",{username})
    }catch(e){
      Alert.alert('Oops', e.message)
    }
  };
  const onSignInPressed = () => {
    navigation.navigate('SignIn')
  };

  

  const onTermsOfUsePressed=()=>{
    console.warn("OnTermsOfUsePressed")
  }
  const onPrivacyPressed =() =>{
    console.warn("OnPrivacyPressed")

  }
  return (
    <View style={styles.root}>
      <Text style={styles.title}> Create an account</Text>

      <CustomInput
      name="Name"
        control={control}
        placeholder="Name"
        rules={{
          required:"Name is required",
          minLength:{
            value:3,
            message:"Username should be at least 3 characters long"
          },
          maxLength:{
            value:24,
            message:"Username should be max 24 characters long"
          }
        }}
      />
      <CustomInput
      name="username"
        control={control}
        placeholder="Username"
        rules={{
          required:"Username is required",
          minLength:{
            value:3,
            message:"Username should be at least 3 characters long"
          },
          maxLength:{
            value:24,
            message:"Username should be max 24 characters long"
          }
        }}
      />
      <CustomInput
      name="email" placeholder="Email" control={control} 
        rules ={{pattern:EMAIL_REGEX, message:"Email is invalid"}}
      />


      <CustomInput
        placeholder="Password"
        name="password"
        secureTextEntry
        control={control}

        rules ={{
          required:'password is required',
          minLength:{
            value:8,
            message:"Password should be at least 8 characters long"
          }
        }}
      />
      <CustomInput
      name="password-repeat"
        placeholder="Repeat Password"
        control ={control}
        secureTextEntry
        rules={{
          validate: value => value === pwd || "Passwords do not match"

        }}
      />
      <Text style={styles.passwordRequirements}>
      Password should be 8+ characters and include symbols, lowercase & uppercase letters, and numbers.
      </Text>
      <CustomButton text="Register" onPress={handleSubmit(onRegisterPressed)} />
      <Text style={styles.text}>
        By registering, you confirm that you accept our{" "}
        <Text style={styles.link} onPress={onTermsOfUsePressed}>Terms of Use</Text> and {' '}
        <Text style={styles.link} onPress={onPrivacyPressed}>Privacy Policy</Text>
      </Text>
      
      
      <CustomButton
        text="Have an account? Sign in"
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
  text:{
    color:'gray',
    marginVertical:10,
  },
  link:{
    color:'#FDB075',
  },
  passwordRequirements: {
    color: "gray",
    marginBottom: 
    20,
    textAlign: "center",
  },
});
