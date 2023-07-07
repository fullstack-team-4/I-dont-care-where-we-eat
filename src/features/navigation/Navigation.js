import { View, Text, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { SignInScreen } from "../screens/SignInScreen/SignInScreen";
import { SignUpScreen } from "../screens/SignUpScreen/SignUpScreen";
import { ConfirmEmailScreen } from "../screens/ConfirmEmailScreen/ConfirmEmailScreen";
import { ForgotPasswordScreen } from "../screens/ForgotPasswordScreen/ForgotPasswordScreen";
import { NewPasswordScreen } from "../screens/NewPasswordScreen/NewPasswordScreen";
import Homeicons from "../screens/HomeIcons/HomeIcons";
import { Auth,Hub } from "aws-amplify";
import HomeScreenGuest from "../screens/HomeIcons/HomeScreenGuest";
const Stack = createNativeStackNavigator();

export const Navigation = () => {
  const [user, setUser] = useState(undefined);

  const checkUser = async () => {

    try{
      const authUser = await Auth.currentAuthenticatedUser({ bypassCach: true });
      setUser(authUser)
    }
    catch(e){
      setUser(null)

    }

  };

  useEffect(() => {
    checkUser();
  }, []);

  useEffect(() => {
    const listener = data => { 
      if (data.payload.event === 'signIn' || data.payload.event === 'signOut') {
        checkUser();
      }
    };
    Hub.listen('auth', listener);
    return () => Hub.remove('auth', listener);
  }, []);
  

  if (user === undefined){
    return (
      <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
        <ActivityIndicator/>
      </View>
    )
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <Stack.Screen name="Home" component={Homeicons} />
        ) : (
          <>
          
            <Stack.Screen name="SignIn" component={SignInScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
            <Stack.Screen name="ConfirmEmail" component={ConfirmEmailScreen} />
            <Stack.Screen
              name="ForgotPassword"
              component={ForgotPasswordScreen}
            />
            <Stack.Screen name="NewPassword" component={NewPasswordScreen} />
            <Stack.Screen name="GuestHome" component={HomeScreenGuest} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
