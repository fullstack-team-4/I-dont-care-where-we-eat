import {
  View,
  Text,
  Image,
  useWindowDimensions,
  StyleSheet,
  Alert,
} from "react-native";
import React, { useState } from "react";
import Logo from "../../../../assets/favicon.png";
import { CustomInput } from "../../components/CustomInput/CustomInput";
import { CustomButton } from "../../components/CustomButton/CustomButton";
import { SocialSignInButtons } from "../../components/SocialSignInButtons/SocialSignInButtons";
import { useNavigation } from "@react-navigation/native";
import { useForm, Controller } from "react-hook-form";
import { Auth } from "aws-amplify";
export const SignInScreen = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { height } = useWindowDimensions();
  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSignInPressed = async data => {
    if (loading) {
      return;
    }

    setLoading(true)
    try {
      
      const response = await Auth.signIn(data.username, data.password);
    } catch (e) {
      Alert.alert("Oops", e.message);
    }

    setLoading(false)
  };

  const onForgotPasswordPressed = () => {
    navigation.navigate("ForgotPassword");
  };

  const onSignUpPressed = () => {
    navigation.navigate("SignUp");
  };
  return (
    <View style={styles.root}>
      <Image
        source={Logo}
        style={[styles.logo, { height: height * 0.3 }]}
        resizeMode="contain"
      />
      <CustomInput
        name="username"
        placeholder="Username"
        control={control}
        rules={{ required: "Username is required" }}
      />
      <CustomInput
        placeholder="Password"
        name="password"
        control={control}
        secureTextEntry={true}
        rules={{ required: "Password is required" }}
      />
      <CustomButton text={loading ? "Loading...":"Sign In"}onPress={handleSubmit(onSignInPressed)} />
      <CustomButton
        text="Forgot Password?"
        onPress={onForgotPasswordPressed}
        type="TERTIARY"
      />
      <SocialSignInButtons />
      <CustomButton
        text="Don't have an account? Create One "
        onPress={onSignUpPressed}
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
});
