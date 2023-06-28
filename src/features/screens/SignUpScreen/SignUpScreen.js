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

export const SignUpScreen = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  
  const navigation = useNavigation();

  const onRegisterPressed = () => {
    navigation.navigate('ConfirmEmail')
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
        placeholder="Username"
        value={username}
        setValue={setUsername}
      />
      <CustomInput placeholder="Email" value={email} setValue={setEmail} />
      <CustomInput
        placeholder="Password"
        value={password}
        setValue={setPassword}
        secureTextEntry={true}
      />
      <CustomInput
        placeholder="Repeat Password"
        value={passwordRepeat}
        setValue={setPasswordRepeat}
        secureTextEntry={true}
      />
      <CustomButton text="Register" onPress={onRegisterPressed} />
      <Text style={styles.text}>
        By registering, you confirm that you accept our{" "}
        <Text style={styles.link} onPress={onTermsOfUsePressed}>Terms of Use</Text> and {' '}
        <Text style={styles.link} onPress={onPrivacyPressed}>Privacy Policy</Text>
      </Text>
      <SocialSignInButtons/>
      
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
  text:{
    color:'gray',
    marginVertical:10,
  },
  link:{
    color:'#FDB075',
  }
});
